import { useState, useEffect } from "react";

function StoryGame({ story, onNewStory }) {
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [options, setOptions] = useState([]);
  const [isEnding, setIsEnding] = useState(false);
  const [isWinningEnding, setIsWinningEnding] = useState(false);
  // When the story is first loaded, set the current node to the root node
  useEffect(() => {
    if (story && story.root_node) {
      const rootNodeId = story.root_node.id;
      setCurrentNodeId(rootNodeId);
    }
  }, [story]);

  useEffect(() => {
    if (currentNodeId && story && story.all_nodes) {
      const node = story.all_nodes[currentNodeId];
      setCurrentNode(node);
      setIsEnding(node.is_ending);
      setIsWinningEnding(node.is_winning_ending);

      if (!node.is_ending && node.options && node.options.length > 0) {
        setOptions(node.options);
      } else {
        setOptions([]);
      }
    }
  }, [currentNodeId, story]);

  const chooseOption = (optionId) => {
    setCurrentNodeId(optionId);
  };

  const restartStory = () => {
    if (story && story.root_node) {
      setCurrentNodeId(story.root_node.id);
    }
  };

  return (
    <div className="story-game">
      <header className="story-header">
        <h2>{story.title}</h2>
      </header>
      <div className="story-content">
        {currentNode && (
          <div className="story-node">
            <p>{currentNode.content}</p>
            {isEnding ? (
              <div className="story-ending">
                <h3>
                  {isWinningEnding
                    ? "Congratulations! You found a winning ending!"
                    : "The End"}
                </h3>
                {isWinningEnding
                  ? "You reached a winning ending. Great job navigating the story!"
                  : "You reached an ending. Try different choices to find a winning ending!"}
              </div>
            ) : (
              <div className="story-options">
                <h3>What do you do?</h3>
                <div className="options-list">
                  {options.map((option, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => chooseOption(option.node_id)}
                        className="option-btn"
                      >
                        {option.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="story-controls">
          <button onClick={restartStory} className="reset-btn">
            Restart Story
          </button>
        </div>
        {onNewStory && (
          <button onClick={onNewStory} className="new-story-btn">
            Create New Story
          </button>
        )}
      </div>
    </div>
  );
}
export default StoryGame;
