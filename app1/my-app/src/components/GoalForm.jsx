import { useState } from 'react';

function GoalForm({ onAddGoal }) {
  const [newGoal, setNewGoal] = useState('');

  const handleSubmit = () => {
    if (newGoal.trim() !== '') {
      onAddGoal(newGoal);
      setNewGoal('');
    }
  };

  return (
    <div className="add-goal-form">
      <input
        type="text"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        placeholder="Ajouter un nouvel objectif"
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default GoalForm;