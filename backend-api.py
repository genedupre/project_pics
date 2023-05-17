#!/usr/bin/env python
# encoding: utf-8
import os
from datetime import datetime
import threading
import json
from flask import Flask
from flask import request
import requests
import nmap
import whois
import ssl
import socket
from urllib.parse import urlparse
import dns.resolver
from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS
import subprocess
import asyncio
import dotenv

dotenv.load_dotenv()
FLASK_HOST = os.environ.get("FLASK_HOST")
FLASK_PORT = os.environ.get("FLASK_PORT")
FLASK_SSL_CERT = os.environ.get("FLASK_SSL_CERT")
FLASK_SSL_KEY = os.environ.get("FLASK_SSL_KEY")

print(f"Starting server on {FLASK_HOST}:{FLASK_PORT}")

app = Flask(__name__)

socketio = SocketIO(app, ping_interval=10, ping_timeout=5,
                    cors_allowed_origins='*', async_mode='threading')

CORS(app, resources={r"/*": {"origins": "*"}})

command_threads = {}  # Dictionary to store command threads per user

# SocketIO endpoints


@socketio.on('connect', namespace='')
def handle_connect():
    session_id = request.args.get('sessionId')
    print(f"Client {session_id} connected")
    socketio.emit(
        'message', f"New client {session_id} connected")


@socketio.on('joinRoom')
def handle_join_room(room):
    session_id = request.args.get('sessionId')
    domain = request.args.get('domain')
    join_room(room)
    print(f"Client {session_id} joined room: {room}")
    # Send a message to the room
    socketio.emit(
        'message', f"Client {session_id} joined room: {room}", room=room)

    global command_threads
    if session_id not in command_threads or not command_threads[session_id].is_alive():
        stop_event = threading.Event()
        command_threads[session_id] = (threading.Thread(target=run_system_command, args=(
            f"ping -t {domain}", room, stop_event), daemon=True), stop_event)
        command_threads[session_id][0].start()


def run_system_command(command, room=None, stop_event=None):
    process = subprocess.Popen(
        command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    for line in iter(process.stdout.readline, ''):
        if stop_event and stop_event.is_set():
            break
        line = line.rstrip()
        print(f"[{room}]: {line}")
        socketio.emit('message', line, room=room)


def send_message_to_room(room, message):
    socketio.emit('message', message, room=room)


def send_message_to_session(session_id, message):
    socketio.emit('message', message, room=session_id)


@socketio.on('message', namespace='')
def handle_message(data):
    session_id = request.args.get('sessionId')
    print(f"Client {session_id} sent message: {data}")


@socketio.on('disconnect', namespace='')
def handle_disconnect():
    session_id = request.args.get('sessionId')
    print(f"Client {session_id} disconnected")
    global command_threads
    if session_id in command_threads:
        thread, stop_event = command_threads[session_id]
        if thread.is_alive():
            stop_event.set()
            thread.join()
        del command_threads[session_id]
        print(f"Client {session_id} stopped command thread")

# API endpoints


@app.route('/webscan')
def web_scanner():
    url = request.args.get('url')
    r = requests.get(url)
    return json.dumps(dict(r.headers), indent=4, sort_keys=True)


@app.route('/web-whois')
def web_whois():
    url = request.args.get('url')
    w = whois.whois(url)
    return json.dumps(dict(w), indent=4, sort_keys=True, default=str)


@app.route('/port-scanner')
def port_scanner():
    url = request.args.get('ip')
    nm = nmap.PortScanner()
    res = nm.scan(url, '22-443')
    return json.dumps({'res': dict(res)})


@app.route('/cert-info')
def cert_info():
    url = urlparse(request.args.get('url'))
    ctx = ssl.create_default_context()
    with socket.create_connection((url.netloc, 443)) as sock:
        with ctx.wrap_socket(sock, server_hostname=url.netloc) as ssock:
            cert = ssock.getpeercert()
            return json.dumps(cert)


@app.route('/dns-records')
def dns_records():
    url = urlparse(request.args.get('url'))

    # https://en.wikipedia.org/wiki/List_of_DNS_record_types
    dns_record_types = ["A", "AAAA", "AFSDB", "APL", "CAA", "CDNSKEY", "CDS", "CERT", "CNAME", "CSYNC", "DHCID", "DLV", "DNAME", "DNSKEY", "DS", "EUI48", "EUI64", "HINFO", "HIP", "HTTPS", "IPSECKEY", "KEY",
                        "KX", "LOC", "MX", "NAPTR", "NS", "NSEC", "NSEC3", "NSEC3PARAM", "NULL", "OPT", "PTR", "RKEY", "RP", "RRSIG", "RT", "SOA", "SRV", "SSHFP", "SVCB", "TA", "TKEY", "TLSA", "TSIG", "TXT", "URI", "ZONEMD"]

    dns_records = {}
    # Loop through all the DNS record types
    for dns_record_type in dns_record_types:
        try:
            res = dns.resolver.resolve(url.netloc, dns_record_type)
            # This is quite ugly, but gets the job done
            start_str = ';ANSWER\n'
            end_str = ';AUTHORITY\n'

            response = str(res.response)

            # Find the start and end of the answer section
            start_index = response.find(start_str)
            end_index = response.find(end_str)

            # Get the answer section
            answer_section = response[start_index+len(start_str):end_index]
            dns_records[dns_record_type] = answer_section.split('\n')
            # Remove any empy values
            dns_records[dns_record_type] = list(
                filter(None, dns_records[dns_record_type]))
        except:
            pass

    return json.dumps(dict(dns_records), indent=4, sort_keys=True, default=str)


if FLASK_SSL_CERT and FLASK_SSL_KEY:
    socketio.run(app, host=FLASK_HOST, port=FLASK_PORT, debug=True,
                 use_reloader=True, ssl_context=(FLASK_SSL_CERT, FLASK_SSL_KEY))
else:
    print("No SSL cert and key found, running without SSL")
    socketio.run(app, host=FLASK_HOST, port=FLASK_PORT,
                 debug=True, use_reloader=True)
