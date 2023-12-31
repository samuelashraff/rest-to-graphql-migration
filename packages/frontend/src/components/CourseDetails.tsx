import { BASE_URL } from "@/config";
import { Course } from "@/types";
import { Label } from "@radix-ui/react-label";
import { Trash, Edit } from "lucide-react";
import { useReducer, useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import { Button } from "./ui/button";
import { CardContent, Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

const CourseDetailEditForm = ({
    course,
    setIsEditMode,
}: {
    course: Course;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const initialCourseDetails = course;
    const revalidator = useRevalidator();

    const [courseDetailEdits, setCourseDetailEdits] = useReducer(
        (prevCourse: Course, nextCourse: Partial<Course>) => ({
            ...prevCourse,
            ...nextCourse,
        }),
        initialCourseDetails,
    );
    const saveCourseChanges = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetch(`${BASE_URL}/courses/${course.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseDetailEdits),
            });
            revalidator.revalidate();
            setIsEditMode(false);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const cancelEdit = () => {
        setIsEditMode(false);
        setCourseDetailEdits(initialCourseDetails);
    };
    return (
        <CardContent className="flex flex-col items-start h-1/3">
            <form className="flex flex-col gap-4" onSubmit={saveCourseChanges}>
                <div className="flex gap-2 items-center justify-center">
                    <Label htmlFor="terms">Credits</Label>
                    <Input
                        type="text"
                        value={courseDetailEdits.credits}
                        onChange={(e) =>
                            setCourseDetailEdits({
                                credits: parseInt(e.target.value),
                            })
                        }
                    />
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <Label htmlFor="terms">Location</Label>
                    <Input
                        type="text"
                        value={courseDetailEdits.location}
                        onChange={(e) =>
                            setCourseDetailEdits({ location: e.target.value })
                        }
                    />
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <Label htmlFor="terms">Organiser</Label>
                    <Input
                        type="text"
                        value={courseDetailEdits.responsible_teacher}
                        onChange={(e) =>
                            setCourseDetailEdits({
                                responsible_teacher: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <Label htmlFor="terms">Status</Label>
                    <Input
                        type="text"
                        value={courseDetailEdits.status}
                        onChange={(e) =>
                            setCourseDetailEdits({ status: e.target.value })
                        }
                    />
                </div>
                <div className="flex gap-4 self-center">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            cancelEdit();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </CardContent>
    );
};

export const CourseDetailCard = ({ course }: { course: Course }) => {
    const {
        credits,
        start_date,
        end_date,
        location,
        responsible_teacher,
        status,
    } = course;

    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();

    const deleteCourse = async () => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this course?",
        );
        if (!shouldDelete) return;

        try {
            console.log("deleting");
            fetch(`${BASE_URL}/courses/${course.id}`, {
                method: "DELETE",
            }).then(() => {
                console.log("here");
                navigate("/", { replace: true });
            });
            console.log("navigating");
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <Card
            className="pt-6 pb-6 flex 
            flex-col rounded 
            shadow-lg"
        >
            {isEditMode ? (
                <CourseDetailEditForm
                    course={course}
                    setIsEditMode={setIsEditMode}
                />
            ) : (
                <>
                    <CardContent className="flex flex-col items-start">
                        <p>
                            <strong>Dates: </strong> {start_date} - {end_date}
                        </p>
                        <p>
                            <strong>Credits:</strong> <Badge>{credits}</Badge>
                        </p>
                        <p>
                            <strong>Location: </strong>
                            {location}
                        </p>
                        <p>
                            <strong>Organiser: </strong>
                            {responsible_teacher}
                        </p>
                        <p>
                            <strong>Status: </strong>
                            <Badge>{status}</Badge>
                        </p>
                    </CardContent>
                    <div className="flex gap-4 self-center">
                        <Button onClick={deleteCourse} variant="destructive">
                            <Trash />
                        </Button>
                        <Button onClick={() => setIsEditMode(true)}>
                            <Edit />
                        </Button>
                    </div>
                </>
            )}
        </Card>
    );
};
