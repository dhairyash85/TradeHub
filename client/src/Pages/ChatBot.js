import axios from "axios";
import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import NavBar from "../Component/NavBar";

const ChatBot = () => {

    const [question, setQuestion]=useState('')
    const [generatingAnswer, setGeneratingAnswer]=useState(false)
    const [answer, setAnswer]=useState('')
    const generateAnswer=async(e)=>{
        e.preventDefault()
        setGeneratingAnswer(true)
        const query=`You have to act as an ai bot for a company that implements barter system, so help people make decisions wether to exchange give money etc, now here is the question for you: ${question}`
        const res=await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCIKIL6hMGQ6IPw-4CRhLKFI2ykVjYBG1Q", {"contents":[{"parts":[{"text":query}]}]})
        console.log(res?.data?.candidates[0 ]?.content?.parts[0])
        setAnswer(res?.data?.candidates[0 ]?.content?.parts[0].text)

        setGeneratingAnswer(false)
    }
  return (
    <div className="100 h-screen px-10 flex flex-col justify-center items-center overflow-auto">
        <NavBar/>
      <form
        onSubmit={generateAnswer}
        className="w-full lg:w-3/3 xl:w-2/2 text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105 mt-24"
      >
        <h1 className="text-4xl font-bold text-primary mb-4 animate-bounce text-purple-400">
          ChatBot
        </h1>
        <textarea
          required
          className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question related to different items"
        ></textarea>
        <button
          type="submit"
          className={`bg-primary text-white p-3 rounded-md hover:bg-blue-900 transition-all duration-300 ${
            generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={generatingAnswer}
        >
          Generate answer
        </button>
      </form>
      <div className="w-full lg:w-3/3 xl:w-2/2 rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105 overflow-auto">
        <ReactMarkdown className="p-6">{answer}</ReactMarkdown>
        {/* {answer && <p>{answer}</p>} */}
      </div>
    </div>
  );
};

export default ChatBot;
