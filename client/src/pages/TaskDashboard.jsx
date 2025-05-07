import TaskList from '../components/TaskList';
import SolarSystemScene from '../components/SolarSystemScene';

export default function TaskDashboard({ onLogout, token }) {
  return (
    <div> 
      <SolarSystemScene />
   
     <TaskList />  {/* If refresh isn't necessary for this, just render it directly */}
    </div>
  );
}
