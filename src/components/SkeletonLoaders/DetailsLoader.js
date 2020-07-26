import { h, Component } from 'preact';

export default function DetailSkeleton({style}) {
    return (
        <div style={style}>
            <svg viewBox="0 0 1500 1000">
                <rect
                    role="presentation"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    clipPath="url(#clip-path-id)"
                    style={{ fill: "url(#animated-diff)" }}
                ></rect>
                <defs role="presentation">
                    <clipPath id="clip-path-id">
                    <rect x="27" y="139" rx="4" ry="4" width="20" height="20" />
    <rect x="67" y="140" rx="10" ry="10" width="85" height="19" />
    <rect x="188" y="141" rx="10" ry="10" width="169" height="19" />
    <rect x="402" y="140" rx="10" ry="10" width="85" height="19" />
    <rect x="523" y="141" rx="10" ry="10" width="169" height="19" />
    <rect x="731" y="139" rx="10" ry="10" width="85" height="19" />
    <rect x="852" y="138" rx="10" ry="10" width="85" height="19" />
    <rect x="1424" y="137" rx="10" ry="10" width="68" height="19" />
    <rect x="26" y="196" rx="4" ry="4" width="20" height="20" />
    <rect x="66" y="197" rx="10" ry="10" width="85" height="19" />
    <rect x="187" y="198" rx="10" ry="10" width="169" height="19" />
    <rect x="401" y="197" rx="10" ry="10" width="85" height="19" />
    <rect x="522" y="198" rx="10" ry="10" width="169" height="19" />
    <rect x="730" y="196" rx="10" ry="10" width="85" height="19" />
    <rect x="851" y="195" rx="10" ry="10" width="85" height="19" />
    <circle cx="1456" cy="203" r="12" />
    <rect x="26" y="258" rx="4" ry="4" width="20" height="20" />
    <rect x="66" y="259" rx="10" ry="10" width="85" height="19" />
    <rect x="187" y="260" rx="10" ry="10" width="169" height="19" />
    <rect x="401" y="259" rx="10" ry="10" width="85" height="19" />
    <rect x="522" y="260" rx="10" ry="10" width="169" height="19" />
    <rect x="730" y="258" rx="10" ry="10" width="85" height="19" />
    <rect x="851" y="257" rx="10" ry="10" width="85" height="19" />
    <circle cx="1456" cy="265" r="12" />
    <rect x="26" y="316" rx="4" ry="4" width="20" height="20" />
    <rect x="66" y="317" rx="10" ry="10" width="85" height="19" />
    <rect x="187" y="318" rx="10" ry="10" width="169" height="19" />
    <rect x="401" y="317" rx="10" ry="10" width="85" height="19" />
    <rect x="522" y="318" rx="10" ry="10" width="169" height="19" />
    <rect x="730" y="316" rx="10" ry="10" width="85" height="19" />
    <rect x="851" y="315" rx="10" ry="10" width="85" height="19" />
    <circle cx="1456" cy="323" r="12" />
    <rect x="26" y="379" rx="4" ry="4" width="20" height="20" />
    <rect x="66" y="380" rx="10" ry="10" width="85" height="19" />
    <rect x="187" y="381" rx="10" ry="10" width="169" height="19" />
    <rect x="401" y="380" rx="10" ry="10" width="85" height="19" />
    <rect x="522" y="381" rx="10" ry="10" width="169" height="19" />
    <rect x="730" y="379" rx="10" ry="10" width="85" height="19" />
    <rect x="851" y="378" rx="10" ry="10" width="85" height="19" />
    <circle cx="1456" cy="386" r="12" />
    <rect x="978" y="138" rx="10" ry="10" width="169" height="19" />
    <rect x="977" y="195" rx="10" ry="10" width="169" height="19" />
    <rect x="977" y="257" rx="10" ry="10" width="169" height="19" />
    <rect x="977" y="315" rx="10" ry="10" width="169" height="19" />
    <rect x="977" y="378" rx="10" ry="10" width="169" height="19" />
    <rect x="1183" y="139" rx="10" ry="10" width="85" height="19" />
    <rect x="1182" y="196" rx="10" ry="10" width="85" height="19" />
    <rect x="1182" y="258" rx="10" ry="10" width="85" height="19" />
    <rect x="1182" y="316" rx="10" ry="10" width="85" height="19" />
    <rect x="1182" y="379" rx="10" ry="10" width="85" height="19" />
    <rect x="1305" y="137" rx="10" ry="10" width="85" height="19" />
    <rect x="1304" y="194" rx="10" ry="10" width="85" height="19" />
    <rect x="1304" y="256" rx="10" ry="10" width="85" height="19" />
    <rect x="1304" y="314" rx="10" ry="10" width="85" height="19" />
    <rect x="1304" y="377" rx="10" ry="10" width="85" height="19" />
    <circle cx="37" cy="97" r="11" />
    <rect x="26" y="23" rx="5" ry="5" width="153" height="30" />
    <circle cx="1316" cy="88" r="11" />
    <rect x="1337" y="94" rx="0" ry="0" width="134" height="3" />
    <circle cx="77" cy="96" r="11" />
                    </clipPath>
                    <linearGradient id="animated-diff">
                        <stop offset="-2" stopColor="#cdcdcd" stopOpacity="1">
                            <animate
                                attributeName="offset"
                                values="-2; -2; 1"
                                keyTimes="0; 0.25; 1"
                                dur="2s"
                                repeatCount="indefinite"
                            ></animate>
                        </stop>
                        <stop offset="-1" stopColor="#dddddd" stopOpacity="1">
                            <animate
                                attributeName="offset"
                                values="-1; -1; 2"
                                keyTimes="0; 0.25; 1"
                                dur="2s"
                                repeatCount="indefinite"
                            ></animate>
                        </stop>
                        <stop offset="0" stopColor="#eeeeee" stopOpacity="1">
                            <animate
                                attributeName="offset"
                                values="0; 0; 3"
                                keyTimes="0; 0.25; 1"
                                dur="2s"
                                repeatCount="indefinite"
                            ></animate>
                        </stop>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
