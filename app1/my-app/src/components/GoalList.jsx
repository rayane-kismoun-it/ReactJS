function GoalList({
  goals,
  editingIndex,
  editingText,
  onEditChange,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
  onOpenDeleteModal
}) {
  return (
    <div className="goals-container">
      <ul>
        {goals.map((goal, index) => (
          <li key={index} className={editingIndex === index ? "editing" : ""}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => onEditChange(e.target.value)}
                  autoFocus
                />
                <div className="goal-actions">
                  <button className="save-btn" onClick={onSaveEdit}>✓</button>
                  <button className="cancel-btn" onClick={onCancelEdit}>✕</button>
                </div>
              </>
            ) : (
              <>
                <span className="goal-text">{goal}</span>
                <div className="goal-actions">
                  <button className="edit-btn" onClick={() => onStartEditing(index)}>✎</button>
                  <button className="delete-btn" onClick={() => onOpenDeleteModal(index)}>✕</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalList;