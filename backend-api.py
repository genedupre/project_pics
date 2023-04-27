#!/usr/bin/env python
# encoding: utf-8
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

app = Flask(__name__)


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


app.run()
