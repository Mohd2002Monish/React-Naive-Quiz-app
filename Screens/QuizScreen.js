import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import questions from "../quiz";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const QuizScreen = () => {
  const navigation = useNavigation();
  const data = questions[0];

  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [counter, setCounter] = useState(null);
  let interval = null;
  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex == currentQuestion.correctOption) {
        setScore((score) => score + 10);
        setIsCorrect(true);
        answer.push({ questions: index + 1, answer: true });
      } else {
        setIsCorrect(false);
        answer.push({ questions: index + 1, answer: false });
      }
    }
  }, [selectedAnswerIndex]);
  useEffect(() => {
    setSelectedAnswerIndex(null);
    setIsCorrect(null);
  }, [index]);
  const currentQuestion = data.questions[index];
  return (
    <SafeAreaView>
      <View>
        <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
          QuizScreen
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text>Timer</Text>
        <Text>Time</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text>Your Progress</Text>
        <Text>
          ({index + 1}/{data.questions.length}) Questions Answered
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#F0F8FF",
          marginTop: 10,
          padding: 10,
          borderRadius: 9,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {currentQuestion?.question}
        </Text>
        <View style={{ marginTop: 12 }}>
          {currentQuestion.options.map((el, index) => {
            return (
              <Pressable
                key={index}
                onPress={() =>
                  selectedAnswerIndex === null && setSelectedAnswerIndex(index)
                }
                style={
                  selectedAnswerIndex === index &&
                  index === currentQuestion.correctOption
                    ? {
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderColor: "#00FFFF",
                        marginVertical: 10,
                        backgroundColor: "green",
                        borderRadius: 20,
                      }
                    : selectedAnswerIndex != null &&
                      selectedAnswerIndex === index
                    ? {
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderColor: "#00FFFF",
                        marginVertical: 10,
                        backgroundColor: "red",
                        borderRadius: 20,
                      }
                    : {
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderColor: "#00FFFF",
                        marginVertical: 10,
                        borderRadius: 20,
                      }
                }
              >
                {selectedAnswerIndex === index &&
                index === currentQuestion.correctOption ? (
                  <AntDesign
                    style={{
                      borderColor: "#00FFFF",
                      textAlign: "center",
                      borderWidth: 0.5,
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      padding: 10,
                    }}
                    name="check"
                    size={20}
                    color="white"
                  />
                ) : selectedAnswerIndex != null &&
                  selectedAnswerIndex === index ? (
                  <AntDesign
                    style={{
                      borderColor: "#00FFFF",
                      textAlign: "center",
                      borderWidth: 0.5,
                      width: 40,
                      height: 40,
                      padding: 10,
                      borderRadius: 20,
                    }}
                    name="closecircle"
                    size={20}
                    color="white"
                  />
                ) : (
                  <Text
                    style={{
                      borderColor: "#00FFFF",
                      textAlign: "center",
                      borderWidth: 0.5,
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      padding: 10,
                    }}
                  >
                    {index + 1}
                  </Text>
                )}

                <Text style={{ marginLeft: 10, alignItems: "center" }}>
                  {el}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View
        style={
          isCorrect === null
            ? null
            : {
                marginTop: 45,
                backgroundColor: "#F0F8FF",
                padding: 10,
                borderRadius: 7,
                height: 120,
              }
        }
      >
        {isCorrect === null ? null : (
          <Text
            style={
              isCorrect == null
                ? null
                : { fontSize: 17, textAlign: "center", fontWeight: "bold" }
            }
          >
            {!!isCorrect ? "Correct Answer" : "Wrong Answer"}
          </Text>
        )}

        {index + 1 >= data.questions.length ? (
          <Pressable
            onPress={() =>
              navigation.navigate("Result", {
                score: score,
                answers: answer,
              })
            }
            style={{
              backgroundColor: "green",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>Done</Text>
          </Pressable>
        ) : isCorrect === null ? null : (
          <Pressable
            onPress={() => setIndex(index + 1)}
            style={{
              backgroundColor: "green",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>Next Question</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;
