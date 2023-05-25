import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

export async function POST(request: Request) {
    const res = await request.json()

    const protocol = res.protocol
    let server = res.server
    const tool = res.tool

    // Check if the protocol is valid, if not, return an error
    if (!["http", "https", "none"].includes(protocol)) {
        return NextResponse.json({ error: "Invalid protocol" })
    }

    if (["http", "https"].includes(protocol)) {
        server = protocol + "://" + server
    }

    // Check if the protocol is none, if so make sure that the server is a valid IP address
    if (protocol == "none" && !/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(server) && tool != "portscan") {
        return NextResponse.json({
            error: "A protocol was not specified, but you are not scanning an IP address, please select a protocol.",
        })
    }

    // Check if the server is valid, if not, return an error it has to be a valid IP address or a valid domain name
    if (
        !/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(res.server) &&
        !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/.test(
            res.server
        )
    ) {
        return NextResponse.json({
            error: "You have entered an invalid server, make sure to only enter an IP address or a URL.",
        })
    }

    // Check if tool is empty
    if (tool == "") {
        return NextResponse.json({
            error: "You have not selected a tool to use.",
        })
    }

    // Check if the tool is valid, if not, return an error
    if (!["webscan", "web-whois", "cert-info", "dns-records", "portscan"].includes(tool)) {
        return NextResponse.json({ error: "Invalid tool" })
    }

    // Log the request
    console.log(`Got ${tool} request on server at ${server}`)

    if(tool == "portscan") {
        if(server == "scanme.nmap.org") { // This is a special case, because it is a domain that is not verified but is allowed
            return NextResponse.json({
                domain: server,
            })
        }

        const cookieStore = cookies()
        const verified_domains = cookieStore.get("verified_domains")

        const domainsVerified = verified_domains?.value.split(",")

        if(domainsVerified == null) {
            return NextResponse.json({ error: "You have not verified any domains yet." })
        }

        const allowed_domains = await db.domains.findMany({
            where: {
                key: {
                    in: domainsVerified,
                },
            },
            select: {
                id: true,
                domain: true,
                key: true,
                createdAt: true,
            },
        })

        const allowed_domains_array = allowed_domains.map((domain) => domain.domain)

        if(!allowed_domains_array.includes(server)) {
            return NextResponse.json({ error: "You have not verified this domain yet." })
        }

        // Return the data
        return NextResponse.json({
            domain: server,
        })
    
    } else {
        // Send a get request to the server
        const response = await fetch(
            `${process.env.SCAN_API_ENDPOINT}/${tool}?url=${server}`
        )
        const data = await response.json()

        // Return the data
        return NextResponse.json(data)
    }

}
