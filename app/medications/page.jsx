"use client"

import { useState } from "react"
import { PaginatedTable } from "@/components/custom/paginated-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

const initialMedications = [
    { id: 1, name: "Aspirin", dosage: "100mg", stock: 500, category: "Pain Relief", available: true },
    { id: 2, name: "Amoxicillin", dosage: "500mg", stock: 200, category: "Antibiotic", available: true },
    { id: 3, name: "Lisinopril", dosage: "10mg", stock: 300, category: "Blood Pressure", available: true },
    // ... more medications
]

export default function MedicationsPage() {
    const [medications, setMedications] = useState(initialMedications)

    const handleStockChange = (id, newStock) => {
        setMedications(medications.map(medication =>
            medication.id === id ? { ...medication, stock: newStock, available: newStock > 0 } : medication
        ))
        toast({
            title: "Stock Updated",
            description: `Medication stock has been updated to ${newStock}.`,
        })
    }

    const columns = [
        { key: "name", label: "Name" },
        { key: "dosage", label: "Dosage" },
        {
            key: "stock",
            label: "Stock",
            render: (value, item) => (
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => handleStockChange(item.id, parseInt(e.target.value))}
                    className="w-20"
                />
            ),
        },
        { key: "category", label: "Category" },
        {
            key: "available",
            label: "Status",
            render: (value) => (
                <Badge variant={value ? "secondary" : "destructive"}>
                    {value ? "Available" : "Out of Stock"}
                </Badge>
            ),
        },
    ]

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Medications</h1>
                <Button>Add New Medication</Button>
            </div>
            <PaginatedTable data={medications} columns={columns} itemsPerPage={10} />
        </div>
    )
}

