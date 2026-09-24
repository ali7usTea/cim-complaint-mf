import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";


interface Fields {
    selectedLinkedComplaintCategory: string;
    selectedLinkedComplaintNature: string;
    selectedLinkedComplaintType: string;
    selectedLinkedComplaintSpecialField: string;
    linkedComplaint: any; // Add this line; you can replace 'any' with a more specific type if needed
}

import type { DataTableRowClickEvent } from "primereact/datatable";
import { ComplaintCategory, ComplaintNature, ComplaintType, LinkedComplaint } from ".";
import { fetchLinkedComplaintsClassificationTree, fetchPreviousComplaints } from "../../../utils/complaints/fetchLinkedComplaints";
import { BffPreviousComplaint } from "../../../utils/complaints/dto";
import SpecialFields, { SpecialField } from "./SpecialFields";

interface LinkedComplaintsProps {
    productCode: string;
    customerSegment: string;
    accountID: string;
    complaintCaptureType: string;
    onLinkedComplaintSelect: (selectedComplaintId: string | null, isNewLinkedComplaint: boolean, newLinkedComplaint: LinkedComplaint | null) => void;
}



const LinkedComplaints: React.FC<LinkedComplaintsProps> = ({
    productCode,
    customerSegment,
    accountID,
    complaintCaptureType,
    onLinkedComplaintSelect
}) => {
    
    const [linkedComplaintsCategories, setLinkedComplaintsCategories] = useState<ComplaintCategory[]>([]);
    const [showLinkedComplaint, setShowLinkedComplaint] = useState(false);
    const [linkedComplaints, setLinkedComplaints] = useState<BffPreviousComplaint[]>([]);
    const [selectedLinkedComplaint, setSelectedLinkedComplaint] = useState<BffPreviousComplaint | null>(null);
    const [showLinkedComplaintClassification, setShowLinkedComplaintClassification] = useState(false);
    const [newLinkedComplaint, setNewLinkedComplaint] = useState<LinkedComplaint | null>(null);
    const [fields, setFields] = useState<Fields>({
        selectedLinkedComplaintCategory: '',
        selectedLinkedComplaintNature: '',
        selectedLinkedComplaintType: '',
        selectedLinkedComplaintSpecialField: '',
        linkedComplaint: null
    });

    useEffect(() => {
        if (showLinkedComplaintClassification) {
            fetchLinkedComplaintsClassificationTree('101', productCode, customerSegment) // should send activityId if existing in case of loading data
                .then((response) => {
                    setLinkedComplaintsCategories(response || []);
                    if(linkedComplaintsCategories.length > 0) {
                        fields.selectedLinkedComplaintCategory = linkedComplaintsCategories[0].code;
                    }
                });
        }
    }, [showLinkedComplaintClassification]);

     useEffect(() => {
        if (showLinkedComplaint) {
            fetchPreviousComplaints(accountID, complaintCaptureType, '') // should send activityId if existing in case of loading data
                .then((response) => {
                    setLinkedComplaints(response || []);
                });
        }
    }, [showLinkedComplaint]);

    function handleLinkedComplaintSelect(event: DataTableRowClickEvent): void {
        const selectedComplaint = event.data as BffPreviousComplaint;
        setSelectedLinkedComplaint(selectedComplaint);
        setShowLinkedComplaint(false);
        setShowLinkedComplaintClassification(false);
        onLinkedComplaintSelect(selectedComplaint.id, false, null);
    }

    function createAndLinkComplaint() {
        if (newLinkedComplaint) {
            setSelectedLinkedComplaint({
                id: '', // or generate a unique id if needed
                category: newLinkedComplaint.category.description,
                impactedService: newLinkedComplaint.nature.description,
                type: newLinkedComplaint.type.description,
                status: '', // or another appropriate status
                creationDate: new Date().toISOString(), // or another appropriate date
            });

            onLinkedComplaintSelect(null, true, newLinkedComplaint);
        }

        setShowLinkedComplaintClassification(false);
        setShowLinkedComplaint(false);
    }

    function onSpecialFieldChange(fields: SpecialField[]) {
        setNewLinkedComplaint((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                specialFields: fields
            };
        });
    }

    return (
        <>
            <div className="col-span-2 w-full flex flex-col mb-4">
                <label>Linked Complaint &emsp;
                    <a
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            setShowLinkedComplaint(true);
                        }}
                    >
                        Select Complaint
                    </a>
                </label>
                {!showLinkedComplaint && selectedLinkedComplaint != null && (
                    <div
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
                        onClick={() => {
                            setShowLinkedComplaint(true);
                            setSelectedLinkedComplaint(null);
                        }}
                    >
                        <span
                            style={{
                                backgroundColor: selectedLinkedComplaint ? "#fffbe6" : "transparent",
                                padding: selectedLinkedComplaint ? "0.25rem 0.5rem" : undefined,
                                borderRadius: selectedLinkedComplaint ? "4px" : undefined,
                                fontWeight: selectedLinkedComplaint ? "bold" : undefined,
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <span>
                                {selectedLinkedComplaint?.category} {selectedLinkedComplaint?.impactedService} - {selectedLinkedComplaint?.type}
                            </span>
                            <Button
                                icon="pi pi-times"
                                className="p-button-text p-button-sm"
                                style={{ marginLeft: "auto" }}
                                onClick={e => {
                                    e.stopPropagation();
                                    setShowLinkedComplaint(false);
                                    setSelectedLinkedComplaint(null);
                                    onLinkedComplaintSelect(null, false, null);
                                }}
                                aria-label="Close"
                            />
                        </span>
                       
                    </div>
                )}
                {showLinkedComplaint && (
                    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", background: "#f9f9f9" }}>
                        <DataTable
                            value={linkedComplaints}
                            onRowClick={handleLinkedComplaintSelect}
                            selection={selectedLinkedComplaint || null}
                            selectionMode="single"
                            rowClassName={(rowData) =>
                                selectedLinkedComplaint && rowData.id === selectedLinkedComplaint.id ? "p-highlight bg-yellow-100" : ""
                            }
                        >
                            <Column field="id" header="ID"></Column>
                            <Column field="category" header="Category"></Column>
                            <Column field="impactedService" header="Impacted Service" sortable></Column>
                            <Column field="type" header="Type"></Column>
                            <Column field="status" header="Status"></Column>
                            <Column field="creationDate" header="Creation Date"></Column>
                        </DataTable>
                        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
                            <Button
                            label="Create New"
                            onClick={() => {
                                setShowLinkedComplaint(false);
                                setSelectedLinkedComplaint(null);
                                setShowLinkedComplaintClassification(true);
                            }}
                        />
                        <Button
                            label="Cancel"
                            onClick={() => {
                                setShowLinkedComplaint(false);
                                setSelectedLinkedComplaint(null);
                            }}
                        />
                        </div>
                        
                    </div>
                )}
                {showLinkedComplaintClassification && (
                    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", background: "#f9f9f9" }}>
                        <div style={{ borderBottom: "1px solid #ddd", marginBottom: "1rem", display: "flex", gap: "1rem" }}>
                            {linkedComplaintsCategories?.map((category, idx) => {
                                // Set first value as selected by default
                                if (idx === 0 && (!fields.selectedLinkedComplaintCategory || !linkedComplaintsCategories.some(cat => cat.code === fields.selectedLinkedComplaintCategory))) {
                                    setTimeout(() => {
                                        fields.selectedLinkedComplaintCategory = category.code;
                                        setNewLinkedComplaint({
                                            category: { code: category.code, description: category.description },
                                            nature: { code: "", description: "" },
                                            type: { code: "", description: "" },
                                            specialFields: null
                                        });
                                    }, 0);
                                }
                                return (
                                    <button
                                        key={category.code}
                                        style={{
                                            background: fields.selectedLinkedComplaintCategory === category.code ? "#e5e7eb" : "transparent",
                                            border: "none",
                                            padding: "0.5rem 1rem",
                                            cursor: "pointer",
                                            fontWeight: fields.selectedLinkedComplaintCategory === category.code ? "bold" : "normal",
                                        }}
                                        onClick={() => {
                                            fields.selectedLinkedComplaintCategory = category.code;
                                            setNewLinkedComplaint({
                                                category: { code: category.code, description: category.description },
                                                nature: { code: "", description: "" },
                                                type: { code: "", description: "" },
                                                specialFields: null
                                            });
                                        }}
                                    >
                                        {category.description}
                                    </button>
                                );
                            })}
                        </div>
                        <div>
                            {linkedComplaintsCategories
                                .filter((cat) => cat.code === fields.selectedLinkedComplaintCategory)
                                ?.map((cat) => (
                                    <div key={cat.code} style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.5rem" }}>
                                        <div style={{ flex: 1 }}>
                                            <label>Impacted Service</label>
                                            <Dropdown
                                                value={fields.selectedLinkedComplaintNature}
                                                options={[
                                                    { label: "--Select Nature--", value: null },
                                                    ...(cat.natures || [])?.map((nature: ComplaintNature) => ({
                                                        label: nature.description,
                                                        value: nature.code,
                                                    })),
                                                ]}
                                                onChange={(e) => {
                                                    setFields(prev => ({
                                                        ...prev,
                                                        selectedLinkedComplaintNature: e.value,
                                                        selectedLinkedComplaintType: '',
                                                        selectedLinkedComplaintSpecialField: ''
                                                    }));
                                                    if (newLinkedComplaint) {
                                                        setNewLinkedComplaint({
                                                            ...newLinkedComplaint,
                                                            nature: {
                                                                code: e.value,
                                                                description: (cat.natures || []).find((n) => n.code === e.value)?.description || "",
                                                            },
                                                            type: { code: "", description: "" },
                                                            specialFields: null
                                                        });
                                                    }
                                                }}
                                                placeholder="--Select Nature--"
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label>Complaint Type</label>
                                            <Dropdown
                                                value={fields.selectedLinkedComplaintType}
                                                options={[
                                                    { label: "--Select Type--", value: null },
                                                    ...(cat.natures
                                                        ?.find((nature) => nature.code === fields.selectedLinkedComplaintNature)
                                                        ?.types || []
                                                    )?.map((type: ComplaintType) => ({
                                                        label: type.description,
                                                        value: type.code,
                                                    })),
                                                ]}
                                                onChange={(e) => {
                                                    setFields(prev => ({
                                                        ...prev,
                                                        selectedLinkedComplaintType: e.value,
                                                        selectedLinkedComplaintSpecialField: ''
                                                    }));
                                                    if (newLinkedComplaint) {
                                                        const selectedNature = (cat.natures || []).find((n) => n.code === fields.selectedLinkedComplaintNature);
                                                        const selectedType = selectedNature?.types?.find((t) => t.code === e.value);
                                                        setNewLinkedComplaint({
                                                            ...newLinkedComplaint,
                                                            type: {
                                                                code: e.value,
                                                                description: selectedType?.description || "",
                                                            },
                                                            specialFields: null
                                                        });
                                                    }
                                                }}
                                                placeholder="--Select Type--"
                                                style={{ width: "100%" }}
                                            />
                                        </div>

                                        {(cat.natures
                                            ?.find((nature) => nature.code === fields.selectedLinkedComplaintNature)
                                            ?.types?.find((type) => type.code === fields.selectedLinkedComplaintType)?.specialFields?.length ??
                                            0) > 0 && (
                                            <div style={{ flex: 1 }}>
                                                <label>Special Field</label>
                                                {(() => {
                                                    const selectedNature = (cat.natures || []).find((n) => n.code === fields.selectedLinkedComplaintNature);
                                                    const selectedType = selectedNature?.types?.find((t) => t.code === fields.selectedLinkedComplaintType);
                                                    return (
                                                        <SpecialFields
                                                            specialFields={selectedType?.specialFields || []}
                                                            onChange={(updatedFields) => onSpecialFieldChange(updatedFields)}
                                                        />
                                                    );
                                                })()}
                                                
                                            </div>
                                        )}
                                    </div>
                                ))}

                            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
                                <Button
                                    label="Create and Link"
                                    onClick={() => {
                                        createAndLinkComplaint();
                                    }}
                                />
                                <Button
                                    label="Cancel"
                                    onClick={() => {
                                        setShowLinkedComplaintClassification(false);
                                        setNewLinkedComplaint(null);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default LinkedComplaints;