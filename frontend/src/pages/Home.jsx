import { useState, useEffect } from "react";
import image1 from "../assets/images/bg.jpg"; // Replace with actual path
import HDimg from "../assets/images/header.png"; // Replace with actual path
import step1Image from "../assets/images/sideIMG1.jpg"; // Replace with actual path
import { Upload, ArrowRight, CheckCircle2, FileText, BarChart3, User } from "lucide-react";
import step2Image from "../assets/images/sideIMG2.png"; // Replace with actual image path
import step3Image from "../assets/images/sideIMG3.png"; // Replace with the correct image path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import samplePDF from "../assets/template.pdf"; // Import the PDF file

const Header = () => {
    const [loggedUser, setLoggedUser] = useState({});

    console.log(loggedUser);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.email) {
            setLoggedUser(user);
        }
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-white/90 backdrop-blur-lg z-50 border-b border-gray-100">
            <div className="flex items-center gap-4">
                <img src={HDimg} alt="Logo" className="w-12 h-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" />
                <span className="text-2xl font-bold tracking-wide">
                    <span className="text-gray-900">S</span>
                    <span className="text-orange-400">D</span>
                    <span className="text-gray-900">S</span>
                    <span className="text-orange-400">N</span>
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group">
                    <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-100 shadow-md hover:border-orange-500 transition-all duration-300 flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden sm:block">
                    <p className="text-gray-900 font-semibold">{loggedUser.name || "Guest"}</p>
                    <p className="text-gray-500 text-sm">{loggedUser.email ? "User" : "Not Logged In"}</p>
                </div>
            </div>
        </header>
    );
};

const WhyChooseUs = () => {
    const features = [
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Comprehensive Analysis",
            description: "Assess financial, organizational, technical, and operational viability with precision."
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Smart Information Extraction",
            description: "Leverage advanced OCR technology for accurate project detail capture."
        },
        {
            icon: <CheckCircle2 className="w-6 h-6" />,
            title: "Seamless Integration",
            description: "Enjoy smooth workflow management with your existing systems."
        }
    ];

    return (
        <motion.section
            className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 md:px-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Empowering business analysts and project managers with intelligent tools for fast, accurate decision-making.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 * index }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-400 mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

const Step1Download = () => {
    return (
        <motion.div
            id="step1"
            className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-24 px-4 sm:px-6 md:px-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-orange-400 font-medium mb-2">Step 1</h3>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Download Project Proposal Template
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Get started by downloading our comprehensive project proposal template. Fill it out with your project details to begin the feasibility analysis.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Download the template",
                                    "Fill out all required fields",
                                    "Save as PDF format"
                                ].map((step, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                                            <span className="text-orange-400 font-semibold">{index + 1}</span>
                                        </div>
                                        <p className="text-gray-700">{step}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <motion.a
                                    href={samplePDF}
                                    download="Project_Proposal_Template.pdf"
                                    className="bg-orange-400 text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg text-lg font-medium text-center transition-all duration-300 hover:bg-orange-500"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Download Template
                                </motion.a>
                                <motion.button
                                    onClick={() => document.getElementById("step2").scrollIntoView({ behavior: "smooth" })}
                                    className="bg-white text-orange-400 border-2 border-orange-400 px-8 py-4 rounded-xl shadow-md hover:shadow-lg text-lg font-medium transition-all duration-300 hover:bg-orange-50"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Next Step
                                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={step1Image}
                                alt="Template Preview"
                                className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Step2Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const userData = JSON.parse(storedUser);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setMessage("");
        } else {
            setMessage("Please select a valid PDF file.");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a PDF file to upload.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("name", selectedFile.name.replace(".pdf", ""));
        formData.append("email", userData.email);

        try {
            await axios.post("http://127.0.0.1:5000/fields/technical", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            await axios.post("http://127.0.0.1:5000/fields/financial", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            localStorage.setItem('file_name', selectedFile.name.replace(".pdf", ""));
            toast.success("File uploaded successfully!");
            document.getElementById("step3").scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            setMessage("Upload failed. Please try again.");
            console.error("Upload error:", error);
        }
        setUploading(false);
    };

    return (
        <motion.div
            id="step2"
            className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 md:px-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-orange-400 font-medium mb-2">Step 2</h3>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Upload Your Project Proposal
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Upload your completed project proposal form. Our system will analyze the document and extract key information for feasibility assessment.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Fill out the downloaded template",
                                    "Save the file as PDF format",
                                    "Upload the PDF file here"
                                ].map((step, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                                            <span className="text-orange-400 font-semibold">{index + 1}</span>
                                        </div>
                                        <p className="text-gray-700">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-orange-400 transition-colors duration-300">
                                <div className="mb-6">
                                    <Upload className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {selectedFile ? selectedFile.name : "Drop your file here"}
                                    </h3>
                                    <p className="text-gray-500">
                                        or click to browse from your computer
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="inline-block bg-orange-400 text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-orange-500"
                                >
                                    Choose File
                                </label>

                                {message && (
                                    <p className="mt-4 text-red-500">{message}</p>
                                )}

                                {selectedFile && (
                                    <motion.button
                                        onClick={handleUpload}
                                        disabled={uploading}
                                        className="mt-6 bg-white text-orange-400 border-2 border-orange-400 px-8 py-4 rounded-xl shadow-md hover:shadow-lg text-lg font-medium transition-all duration-300 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {uploading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                                                Uploading...
                                            </div>
                                        ) : (
                                            "Upload File"
                                        )}
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Step3Quizz = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate("/quiz");
    };

    return (
        <motion.div
            id="step3"
            className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-24 px-4 sm:px-6 md:px-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-orange-400 font-medium mb-2">Step 3</h3>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Feasibility Assessment Quizzes
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Complete four short quizzes to assess different aspects of your project's feasibility.
                            </p>
                            <div className="space-y-6">
                                {[
                                    "Organizational Feasibility",
                                    "Technical Feasibility",
                                    "Operational Feasibility",
                                    "Financial Feasibility"
                                ].map((quiz, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                                            <span className="text-orange-400 font-semibold">{index + 1}</span>
                                        </div>
                                        <p className="text-gray-700">{quiz}</p>
                                    </div>
                                ))}
                            </div>
                            <motion.button
                                onClick={handleStartQuiz}
                                className="mt-8 bg-orange-400 text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg text-lg font-medium transition-all duration-300 hover:bg-orange-500"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Start Quiz
                                <ArrowRight className="inline-block ml-2 w-5 h-5" />
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={step3Image}
                                alt="Quiz Illustration"
                                className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                            <img src={HDimg} alt="Logo" className="w-12 h-12 rounded-2xl shadow-lg" />
                            <span className="text-2xl font-bold tracking-wide">
                                <span className="text-gray-900">S</span>
                                <span className="text-orange-400">D</span>
                                <span className="text-gray-900">S</span>
                                <span className="text-orange-400">N</span>
                            </span>
                        </div>
                        <p className="text-gray-600">
                            Empowering businesses with intelligent project feasibility analysis and decision-making tools.
                        </p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { href: "#step1", text: "Download Template" },
                                { href: "#step2", text: "Upload Proposal" },
                                { href: "#step3", text: "Take Quiz" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-600 hover:text-orange-400 transition-colors duration-300"
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center md:text-right">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Connect With Us</h3>
                        <div className="flex justify-center md:justify-end gap-4">
                            {[
                                { icon: faFacebook, color: "text-orange-600", hover: "hover:bg-orange-50" },
                                { icon: faInstagram, color: "text-pink-600", hover: "hover:bg-pink-50" },
                                { icon: faWhatsapp, color: "text-green-600", hover: "hover:bg-green-50" },
                                { icon: faEnvelope, color: "text-red-600", hover: "hover:bg-red-50" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={`w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center ${social.color} ${social.hover} transition-colors duration-300`}
                                >
                                    <FontAwesomeIcon icon={social.icon} size="lg" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                        © {new Date().getFullYear()} SDSN. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const ProjectPlanning = () => {
    return (
        <div className="relative min-h-screen bg-white">
            <Header />
            <div
                className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12"
                style={{
                    backgroundImage: `url(${image1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/70"></div>

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                        Smarter Project Planning
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-bold text-orange-400 mb-8">
                        Starts with the Right Feasibility Check
                    </h2>
                    <motion.button
                        onClick={() => document.getElementById("step1").scrollIntoView({ behavior: "smooth" })}
                        className="bg-white text-gray-900 px-8 py-4 rounded-xl shadow-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started
                        <ArrowRight className="inline-block ml-2 w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>

            <div>
                <WhyChooseUs />
                <Step1Download />
                <Step2Upload />
                <Step3Quizz />
                <Footer />
            </div>
        </div>
    );
};

export default ProjectPlanning;
