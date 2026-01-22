import { useState, useEffect, useCallback } from 'react';

export function useSpeech() {
  const [voice, setVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const canSpeak = 'speechSynthesis' in window && 
                     typeof SpeechSynthesisUtterance !== 'undefined';
    setIsSupported(canSpeak);

    if (!canSpeak) return;

    const PREFERRED_VOICES = [
      'Microsoft Ana Online (Natural) - English (United States)',
      'Microsoft Jenny Online (Natural) - English (United States)',
      'Google US English',
      'Google UK English Female',
      'Samantha',
      'Daniel',
    ];

    const pickEnglishVoice = (voices) => {
      if (!voices || !voices.length) return null;
      
      const englishVoices = voices.filter(
        v => v.lang && (v.lang.startsWith('en-') || v.lang === 'en')
      );
      
      if (!englishVoices.length) return voices[0] || null;

      // Try preferred voices first
      for (const preferredName of PREFERRED_VOICES) {
        const match = englishVoices.find(v => v.name === preferredName);
        if (match) return match;
      }

      // Try Microsoft Natural
      const msNatural = englishVoices.find(
        v => v.name.includes('Natural') && v.name.includes('Microsoft')
      );
      if (msNatural) return msNatural;

      // Try Google
      const googleVoice = englishVoices.find(v => v.name.startsWith('Google'));
      if (googleVoice) return googleVoice;

      // Default to first English US or any English
      return englishVoices.find(v => v.lang === 'en-US') || englishVoices[0];
    };

    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        setVoice(pickEnglishVoice(voices));
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text, options = {}) => {
    if (!isSupported || !text?.trim()) return;

    if (options.interrupt !== false) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text.trim());
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'en-US';
    }

    utterance.rate = options.rate || 0.95;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      options.onEnd?.();
    };
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [voice, isSupported]);

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
  };
}

export default useSpeech;
