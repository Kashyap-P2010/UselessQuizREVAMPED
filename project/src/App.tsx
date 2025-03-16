import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import { Frown, RefreshCw } from 'lucide-react';
import { questions } from './questions';
import type { GameState } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    isGameOver: false,
  });

  const [playWrong] = useSound('https://assets.mixkit.co/active_storage/sfx/2954/2954-preview.mp3');
  const [playLaugh] = useSound('https://assets.mixkit.co/active_storage/sfx/2053/2053-preview.mp3');

  const handleAnswer = () => {
    playWrong();
    setGameState(prev => ({
      ...prev,
      score: prev.score - 10,
      currentQuestion: prev.currentQuestion + 1,
      isGameOver: prev.currentQuestion === questions.length - 1,
    }));
  };

  const resetGame = () => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      isGameOver: false,
    });
  };

  if (gameState.isGameOver) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-red-600 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Frown className="w-20 h-20 mx-auto text-red-500 mb-4" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 text-red-600">WOWOW IMAGINE!</h1>
          <p className="text-xl mb-6">
            You scored {gameState.score}! That's impressively terrible! 
            Did you even try? 🤣
          </p>
          <button
            onClick={resetGame}
            className="bg-red-600 text-white px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 mx-auto hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again (if you dare)
          </button>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[gameState.currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-8 max-w-2xl w-full shadow-2xl"
      >
        <div className="text-right mb-4">
          <span className="text-xl font-bold text-red-600">
            Score: {gameState.score}
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-6">
          {currentQuestion.question}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="wait">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={option}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={handleAnswer}
                className="bg-purple-600 text-white p-4 rounded-lg text-left hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          Question {gameState.currentQuestion + 1} of {questions.length}
        </div>
      </motion.div>
    </div>
  );
}

export default App;