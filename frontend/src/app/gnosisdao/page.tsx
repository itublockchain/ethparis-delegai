"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { Dashboard, DashboardComponent } from "@/components"

const data = {"url": "forum.gnosis.io/t/1904/posts.json"}
const header = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0'}

axios.defaults.headers.post['User-Agent'] = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0';

export default function GnosisDao() {

    const [tendancy, setTendancy] = useState<number>(0)

    useEffect(() => {
        axios.post("http://127.0.0.1:5000/get_tendancy", {"url": "https://forum.gnosis.io/t/1904/posts.json"})
        .then((response) => {
            setTendancy(response.data["tendancy"])
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return <>

    <div className="flex flex-col  items-center pt-10">
        <div className="flex items-center justify-center">
        <h1 className="text-3xl mb-72">GIP-57: Should Gnosis DAO support research of a zkSNARK-enabled light client and bridge?</h1>
        <DashboardComponent percentage={tendancy} description="Tendancy of the forum" title="GIP 16" />
        <div className='flex flex-col w-72 h-48 border-2 rounded-xl items-center justify-between p-2 scale-[2]'>
        <h1 className='text-lg'>Score analysis</h1>
        <p>Scores with positive-negative tendancy</p>
        </div>
        
      </div>
    </div>
    </>
}