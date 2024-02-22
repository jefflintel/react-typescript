import { ReactNode } from "react";
import CourseGoal from "./CourseGoal.tsx"; //.tsx included because it's best practice for vite projects
import { type CourseGoal as CGoal } from "../App.tsx";
import InfoBox from "./InfoBox.tsx";

type CourseGoalListProps = {
  goals: CGoal[];
  onDeleteGoal: (id: number) => void;
};

export default function CourseGoalList({
  goals,
  onDeleteGoal,
}: CourseGoalListProps) {
  if (goals.length === 0) {
    return (
      <InfoBox mode="hint" >
        You don't have any course goals yet. Add some!
      </InfoBox>
    );
  }
  
let warningBox: ReactNode;

if (goals.length >= 4 ) {
    warningBox = <InfoBox mode="warning" severity="medium">Wow! That's a lot of goals. Maybe focus on a few so you're sure you succeed!</InfoBox>
}
  return (
    <>
    {warningBox}
    <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <CourseGoal id={goal.id} title={goal.title} onDelete={onDeleteGoal}>
            <p>{goal.description}</p>
          </CourseGoal>
        </li>
      ))}
    </ul>
  </>
)}
