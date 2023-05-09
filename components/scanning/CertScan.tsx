import React from "react"

type NameValuePair = [string, string]
type Subject = NameValuePair[]
type Issuer = NameValuePair[]
type SubjectAltName = NameValuePair[]

interface CertificateDataProps {
    data: {
        subject: Subject
        issuer: Issuer
        version: number
        serialNumber: string
        notBefore: string
        notAfter: string
        subjectAltName: SubjectAltName
        OCSP: string[]
        caIssuers: string[]
        crlDistributionPoints: string[]
    }
}

const normalizeName = (name: string | string[]) => {
    if (Array.isArray(name)) {
        return name
    }
    return name
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([A-Z]{2,})/g, " $1")
}

const CertScan: React.FC<CertificateDataProps> = ({ data }) => {
    const {
        subject,
        issuer,
        version,
        serialNumber,
        notBefore,
        notAfter,
        subjectAltName,
        OCSP,
        caIssuers,
        crlDistributionPoints,
    } = data

    const normalizedSubject = subject.map(([name, value]) => [
        normalizeName(name),
        value,
    ])

    const normalizedIssuer = issuer.map(([name, value]) => [
        normalizeName(name),
        value,
    ])

    return (
        <div className="not-prose relative mt-5 hidden overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/25 md:block">
            <div className="relative overflow-auto rounded-xl">
                <div className="my-4 overflow-hidden shadow-sm">
                    <h2 className="mb-4 pl-4 text-2xl font-extrabold leading-tight tracking-tighter">
                        Subject:
                    </h2>
                    <table className="w-full table-auto border-collapse text-sm">
                        <thead>
                            <tr>
                                <th className="w-1/6 border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                    Key
                                </th>
                                <th className="w-4/6 border-b p-4 pb-3 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white dark:bg-slate-800"
                            key="subject-scan-result"
                        >
                            {normalizedSubject.map(([name, value], index) => (
                                <tr key={index}>
                                    {Array.isArray(name) &&
                                        name.map((item) => {
                                            return (
                                                <td
                                                    className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400"
                                                    key={`${index}-${item}`}
                                                >
                                                    {item}
                                                </td>
                                            )
                                        })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2 className="my-4 pl-4 text-2xl font-extrabold leading-tight tracking-tighter">
                        Issuer:
                    </h2>
                    <table className="mb-4 w-full table-auto border-collapse pl-4 text-sm">
                        <thead>
                            <tr>
                                <th className="w-1/6 border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                    Key
                                </th>
                                <th className="w-4/6 border-b p-4 pb-3 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white dark:bg-slate-800"
                            key="issuer-scan-result"
                        >
                            {normalizedIssuer.map(([name, value], index) => (
                                <tr key={index}>
                                    {Array.isArray(name) &&
                                        name.map((item) => {
                                            return (
                                                <td
                                                    className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400"
                                                    key={`${index}-${item}`}
                                                >
                                                    {item}
                                                </td>
                                            )
                                        })}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <ul className="list-none pl-4">
                        <li key="version">
                            <strong>Version:</strong> {version}
                        </li>
                        <li key="serialNumber">
                            <strong>Serial Number:</strong> {serialNumber}
                        </li>
                        <li key="notBefore">
                            <strong>Not Before:</strong> {notBefore}
                        </li>
                        <li key="notAfter">
                            <strong>Not After:</strong> {notAfter}
                        </li>
                    </ul>

                    <h2 className="my-4 pl-4 text-2xl font-extrabold leading-tight tracking-tighter">
                        Subject Alternative Names:
                    </h2>
                    <table className="mb-4 w-full table-auto border-collapse pl-4 text-sm">
                        <thead>
                            <tr>
                                <th className="w-1/6 border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                    Key
                                </th>
                                <th className="w-4/6 border-b p-4 pb-3 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white dark:bg-slate-800"
                            key="SAN-scan-result"
                        >
                            {subjectAltName.map(([type, value], index) => (
                                <tr key={index}>
                                    <td
                                        className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400"
                                        key={`${index}-${type}`}
                                    >
                                        {type}
                                    </td>
                                    <td
                                        className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400"
                                        key={`${index}-${value}`}
                                    >
                                        {value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ul className="list-none pl-4">
                        <li key="OCSP">
                            <strong>OCSP:</strong> {OCSP}
                        </li>
                        <li key="caIssuers">
                            <strong>CA Issuers:</strong> {caIssuers}
                        </li>
                        <li key="crlDistributionPoints">
                            <strong>CRL Distribution Points:</strong>{" "}
                            {crlDistributionPoints}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CertScan
