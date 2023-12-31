import React, { useState } from "react";
import ReactModal from "react-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/config";
import { useRevalidator } from "react-router-dom";

ReactModal.setAppElement("#root");

export function CreateCourseModal({
    isOpen,
    closeModal,
}: {
    isOpen: boolean;
    closeModal: React.MouseEventHandler;
}) {
    const revalidator = useRevalidator();

    const [formData, setFormData] = useState({
        name: "",
        status: "",
        startDate: "",
        endDate: "",
    });

    const handleCreateFormInputChange = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then(() => {
                revalidator.revalidate();
                closeModal({} as React.MouseEvent);
            });
        } catch (e) {
            console.error("Error: " + e);
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Create Course Modal"
        >
            <h2 className="text-2xl mb-4 font-bold flex justify-center items-center">
                Create Course
            </h2>
            <div className="p-6 bg-white rounded-lg shadow-lg flex justify-center items-center">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleCreateFormInputChange}
                            placeholder="Course Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleCreateFormInputChange}
                            placeholder="Status"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleCreateFormInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleCreateFormInputChange}
                            required
                        />
                    </div>
                    <Button type="submit" className="mr-4">
                        Create Course
                    </Button>
                    <Button onClick={closeModal}>Close</Button>
                </form>
            </div>
        </ReactModal>
    );
}
