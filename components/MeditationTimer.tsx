import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

export const MeditationTimer = () => {
  const [selectedMinutes, setSelectedMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Time options from 5 to 60 minutes in 5-minute increments
  const timeOptions = Array.from({ length: 12 }, (_, i) => (i + 1) * 5);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (selectedMinutes === 0) {
            setIsActive(false);
            if (interval) clearInterval(interval);
          } else {
            setSelectedMinutes(selectedMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, selectedMinutes, seconds]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setSeconds(0);
  };

  const formatTime = () => {
    return `${selectedMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSelectTime = (minutes: number) => {
    if (!isActive) {
      setSelectedMinutes(minutes);
      setSeconds(0);
    }
  };

  return (
    <View className="w-full items-center">
      <Text className="my-8 text-4xl font-bold">{formatTime()}</Text>
      
      {!isActive && (
        <View className="mb-8 w-full px-4">
          <Text className="mb-2 text-center text-lg font-medium">Select duration (minutes)</Text>
          <FlatList
            data={timeOptions}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity className={`mx-2 rounded-full px-4 py-2 ${selectedMinutes === item ? 'bg-blue-500' : 'bg-gray-200'}`} onPress={() => handleSelectTime(item)}>
                <Text className={`${selectedMinutes === item ? 'text-white' : 'text-gray-800'}`}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      )}
      
      <View className="mt-4 flex-row justify-center space-x-4">
        {!isActive ? (
          <TouchableOpacity className="rounded-lg bg-green-500 px-6 py-3" onPress={handleStart}>
            <Text className="font-bold text-white">Start</Text>
          </TouchableOpacity>
        ) : !isPaused ? (
          <TouchableOpacity className="rounded-lg bg-red-500 px-6 py-3" onPress={handlePause}>
            <Text className="font-bold text-white">Stop</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity className="rounded-lg bg-green-500 px-6 py-3" onPress={handleResume}>
              <Text className="font-bold text-white">Resume</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-lg bg-gray-500 px-6 py-3" onPress={handleReset}>
              <Text className="font-bold text-white">Reset</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};