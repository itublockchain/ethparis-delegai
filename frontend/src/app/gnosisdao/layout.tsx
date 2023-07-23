import React from "react"

export default function LayoutGnosisDao({ children }: {children: React.ReactNode}) {
    return <>
    <div className="w-full h-screen bg-[#D0CAB9]">
        {children}
    </div>
    </>
}