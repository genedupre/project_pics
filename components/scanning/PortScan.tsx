"use client"

import React, { useEffect, useRef, useState } from "react"
import {
    Terminal,
    type ITerminalInitOnlyOptions,
    type ITerminalOptions,
    type ITheme,
} from "xterm"
import { FitAddon } from "xterm-addon-fit"
import "xterm/css/xterm.css"
import { Socket, io } from "socket.io-client"
import { Button } from "@/components/ui/button"

const theme: ITheme = {
    background: `#000000`,
    cursor: "transparent",
    black: `#000000`,
    red: "#E54B4B",
    green: "#9ECE58",
    yellow: "#FAED70",
    blue: "#396FE2",
    magenta: "#BB80B3",
    cyan: "#2DDAFD",
    white: "#d0d0d0",
    brightBlack: "rgba(255, 255, 255, 0.2)",
    brightRed: "#FF5370",
    brightGreen: "#C3E88D",
    brightYellow: "#FFCB6B",
    brightBlue: "#82AAFF",
    brightMagenta: "#C792EA",
    brightCyan: "#89DDFF",
    brightWhite: "#ffffff",
    selectionBackground: "#cbdccb",
}

const terminalProps: ITerminalOptions = {
    disableStdin: true,
    cursorStyle: "underline",
    allowTransparency: true,
    fontSize: 12,
    theme: theme,
    allowProposedApi: true,
}

const terminalInitOnlyProps: ITerminalInitOnlyOptions = {
    rows: 30,
}

interface ScanProps {
    data: Record<string, string>
}

const PortScan: React.FC<ScanProps> = ({ data }) => {
    const terminalRef = useRef<HTMLDivElement>(null)
    const fitAddonRef = useRef<FitAddon | null>(null)
    const socketRef = useRef<Socket | null>(null) // Reference to the WebSocket connection
    const terminalInstanceRef = useRef<Terminal | null>(null)

    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const terminal = new Terminal({
            ...terminalProps,
            ...terminalInitOnlyProps,
        })
        const fitAddon = new FitAddon()
        terminal.loadAddon(fitAddon)
        fitAddonRef.current = fitAddon
        terminal.open(terminalRef.current!)
        terminalInstanceRef.current = terminal

        const sessionId = Math.floor(Math.random() * 100000 + 1) // Generate a random session ID

        if (!socketRef.current) {
            // Connect to the WebSocket server and create the connection if it doesn't exist
            socketRef.current = io(`${process.env.NEXT_PUBLIC_WS_ENDPOINT}`, {
                query: {
                    sessionId: sessionId,
                    domain: data.domain,
                },
            })

            socketRef.current.on("connect", () => {
                console.log("SocketIO connection opened")
                socketRef.current?.send("Hello from the client!")
                socketRef.current?.emit("joinRoom", sessionId)
                setIsConnected(true)
            })

            socketRef.current.on("disconnect", () => {
                console.log("SocketIO connection closed")
                setIsConnected(false)
            })

            socketRef.current.on("message", (message: string) => {
                console.log("Received SocketIO message:", message)
                terminalInstanceRef.current?.writeln(message)
            })
        }

        return () => {
            fitAddon.dispose()
            terminal.dispose()
        }
    }, [])

    return (
        <>
            <div className="terminal h-full w-full" ref={terminalRef} />{" "}
            {isConnected && (
            <Button
                className="mt-4 w-full"
                variant="destructive"
                onClick={() => {
                    socketRef.current?.disconnect()
                }}
            >
                Stop Portscan
            </Button>
            ) }
        </>
    )
}

export default PortScan
