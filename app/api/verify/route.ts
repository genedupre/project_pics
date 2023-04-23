import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function POST(request: Request) {
    const res = await request.json()

    const domain = res.domain
    const key = res.key

    // Log the request
    console.log(`Got verify request on domain at ${domain}`)

    // Check if the domain is valid, if not, return an error
    if (
        !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/.test(
            domain
        )
    ) {
        return NextResponse.json({ error: "Invalid domain name", status: 406 })
    }

    // First make a get request to the domain using https to see if that works, otherwise use http
    let protocol = "https"
    let response = null
    try {
        response = await fetch(`${protocol}://${domain}/pics-project.txt`)
    } catch (e) {
        try {
            protocol = "http"
            response = await fetch(`${protocol}://${domain}/pics-project.txt`)
        } catch (e) {
            return NextResponse.json({
                error: "Unable to find domain, check your spelling",
                status: 406,
            })
        }
    }

    // Get website html
    const html = await response.text()

    // Check if the key exists in the html
    if (!html.includes(key)) {
        return NextResponse.json({
            error: "Invalid key, try again",
            status: 406,
        })
    }

    // Check if there is any cookies for the user
    const cookieStore = cookies()
    const verified_domains = cookieStore.get("verified_domains")

    // Add cookie to the user
    let cookie = ""
    if (verified_domains == null) {
        cookie = key
    } else {
        cookie = verified_domains.value + "," + key
    }

    // Add the domain to the database
    const verification = await db.domains.create({
        data: {
            domain: domain,
            key: key,
        },
        select: {
            id: true,
        },
    })

    // Log the verification
    console.log(`Added verification with id ${verification.id} to the database`)

    // Return the data
    return new Response(
        JSON.stringify({
            message: "Domain verified",
        }),
        {
            status: 200,
            headers: { "Set-Cookie": `verified_domains=${cookie}` },
        }
    )
}

export async function GET(request: Request) {
    const cookieStore = cookies()
    const verified_domains = cookieStore.get("verified_domains")

    // turn the verified_domains cookie into a string
    let domains = ""
    if (verified_domains != null) {
        domains = verified_domains.value
    }

    const domain_list = await db.domains.findMany({
        where: {
            key: {
                in: domains.split(","),
            },
        },
        select: {
            id: true,
            domain: true,
            key: true,
            createdAt: true,
        },
    })

    // Return the data
    return NextResponse.json(domain_list)
}
