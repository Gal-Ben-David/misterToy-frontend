import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service-local.js"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export function Dashboard() {

    const [labelsStats, setLabelsStats] = useState([])
    const [data, setData] = useState(null)

    useEffect(() => {
        toyService.getLabelsStats()
            .then(res => {
                setLabelsStats(res)
            })
    }, [])

    useEffect(() => {
        if (labelsStats.length > 0) {
            setData({
                labels: labelsStats.map(labelS => labelS.title),
                datasets: [
                    {
                        type: 'doughnut',
                        label: '# of Votes',
                        data: labelsStats.map(labelS => labelS.value),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.5)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(255, 159, 64, 1)',
                        ]
                    },
                ],
            })
        }
    }, [labelsStats])

    return (
        <section className="dashboard">
            <h1>Dashboard 📊</h1>
            <div className="doughnut-stats">
                {data && <Pie data={data} />}
            </div>
        </section>
    )
}
