import { useState } from 'react'
import './App.css'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'

function App() {
  const [goals, setGoals] = useState([
    "Faire les courses",
    "Aller à la salle de sport 3 fois par semaine",
    "Monter à plus de 5000m d altitude",
    "Acheter mon premier appartement",
    "Perdre 5 kgs",
    "Gagner en productivité",
    "Apprendre un nouveau langage",
    "Faire une mission en freelance",
    "Organiser un meetup autour de la tech",
    "Faire un triathlon",
  ]);

  const [showModal, setShowModal] = useState(false);
  const [goalToRemove, setGoalToRemove] = useState(null);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  const openDeleteModal = (index) => {
    setGoalToRemove(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setGoals(goals.filter((_, index) => index !== goalToRemove));
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(goals[index]);
  };

  const saveEdit = () => {
    if (editingText.trim() !== '') {
      const updatedGoals = [...goals];
      updatedGoals[editingIndex] = editingText;
      setGoals(updatedGoals);
      setEditingIndex(null);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="App">
      <header>
        <h1>Mes Objectifs</h1>
      </header>
      <main>
        <GoalList
          goals={goals}
          editingIndex={editingIndex}
          editingText={editingText}
          onEditChange={(text) => setEditingText(text)}
          onStartEditing={startEditing}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          onOpenDeleteModal={openDeleteModal}
        />

        <GoalForm onAddGoal={handleAddGoal} />

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirmation</h3>
              <p>Êtes-vous sûr de vouloir supprimer cet objectif ?</p>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={cancelDelete}>Annuler</button>
                <button className="confirm-btn" onClick={confirmDelete}>Supprimer</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App
