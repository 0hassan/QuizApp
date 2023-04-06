import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    question: 'What is the largest country in the world?',
    options: ['Russia', 'Canada', 'China', 'United States'],
    correctAnswer: 'Russia',
  },
  {
    question: 'What is the smallest country in the world?',
    options: ['Monaco', 'Maldives', 'Vatican City', 'San Marino'],
    correctAnswer: 'Vatican City',
  },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // resetQuiz();
    } else {
      showAlert();
      ScoreAlert();
      resetQuiz();
    }
  };

  const showAlert = () => {
    Alert('Quiz Finished', `Your score: ${score}/${questions.length}`, [
      {text: 'OK', onPress: resetQuiz},
    ]);
  };

  const ScoreAlert = () => {
    Alert(
      // "Quiz Finished",
      `Your score: ${score}/${questions.length}`,
      [{text: 'OK', onPress: resetQuiz}],
    );
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <View style={styles.container}>
      {currentQuestion < questions.length ? (
        <View>
          <Text style={styles.question}>
            {questions[currentQuestion].question}
          </Text>
          <FlatList
            data={questions[currentQuestion].options}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleAnswer(item)}>
                <Text style={styles.optionButtonText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : null}
      <Text style={styles.score}>Score: {score}</Text>
      <TouchableOpacity style={styles.finishButton} onPress={ScoreAlert}>
        <Text style={styles.finishButtonText}>Current Score</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.finishButton} onPress={resetQuiz}>
        <Text style={styles.finishButtonText}>Finish Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  optionButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    marginVertical: 16,
  },
  finishButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
