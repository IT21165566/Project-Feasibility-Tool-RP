import { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import Header from "../components/Header";
import NavBar from "../components/Navbar";

const Stats = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setEmail(userData.email || "");
        }
    }, []);

    useEffect(() => {
        if (!email) return;

        const fetchProjects = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/projects?email=sadishancisco3@gmail.com`);
                setProjects(response.data.projects);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError("Failed to fetch projects.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [email]);

    // Calculate statistics
    const calculateStats = () => {
        const stats = {
            technical: {},
            financial: {},
            organizational: {},
            operational: {}
        };

        projects.forEach(project => {
            ['technical', 'financial', 'organizational', 'operational'].forEach(category => {
                const result = project[`${category}_result`];
                stats[category][result] = (stats[category][result] || 0) + 1;
            });
        });

        return stats;
    };

    const stats = calculateStats();

    // Calculate overall distribution for pie chart
    const calculateOverallDistribution = () => {
        const distribution = {
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            L5: 0
        };

        projects.forEach(project => {
            ['technical', 'financial', 'organizational', 'operational'].forEach(category => {
                const result = project[`${category}_result`];
                distribution[result] = (distribution[result] || 0) + 1;
            });
        });

        return Object.entries(distribution).map(([level, count]) => ({
            name: level,
            value: count
        }));
    };

    const overallDistribution = calculateOverallDistribution();

    // Bar chart options
    const barChartOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['L1', 'L2', 'L3', 'L4', 'L5'],
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
        legend: {
            position: 'bottom'
        },
        title: {
            text: 'Project Results Distribution by Category',
            align: 'center'
        }
    };

    // Pie chart options
    const pieChartOptions = {
        chart: {
            type: 'pie',
        },
        labels: ['L1', 'L2', 'L3', 'L4', 'L5'],
        colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0'],
        legend: {
            position: 'bottom'
        },
        title: {
            text: 'Overall Results Distribution',
            align: 'center'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const barChartSeries = [
        {
            name: 'Technical',
            data: ['L1', 'L2', 'L3', 'L4', 'L5'].map(level => stats.technical[level] || 0)
        },
        {
            name: 'Financial',
            data: ['L1', 'L2', 'L3', 'L4', 'L5'].map(level => stats.financial[level] || 0)
        },
        {
            name: 'Organizational',
            data: ['L1', 'L2', 'L3', 'L4', 'L5'].map(level => stats.organizational[level] || 0)
        },
        {
            name: 'Operational',
            data: ['L1', 'L2', 'L3', 'L4', 'L5'].map(level => stats.operational[level] || 0)
        }
    ];

    const pieChartSeries = overallDistribution.map(item => item.value);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex h-screen">
            <NavBar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="p-6 flex-1 bg-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Category Distribution</h2>
                            <div className="h-[400px]">
                                <ReactApexChart
                                    options={barChartOptions}
                                    series={barChartSeries}
                                    type="bar"
                                    height={350}
                                />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Overall Distribution</h2>
                            <div className="h-[400px]">
                                <ReactApexChart
                                    options={pieChartOptions}
                                    series={pieChartSeries}
                                    type="pie"
                                    height={350}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Project Details</h2>
                        {loading ? (
                            <div className="text-center py-4 text-gray-500">Loading projects...</div>
                        ) : error ? (
                            <div className="text-center py-4 text-red-500">{error}</div>
                        ) : projects.length === 0 ? (
                            <div className="text-center py-4 text-gray-500">No projects found</div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technical</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Financial</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizational</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operational</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentItems.map((project, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.file_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.technical_result}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.financial_result}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.organizational_result}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.operational_result}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="flex justify-center mt-4 space-x-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 rounded-md ${currentPage === 1
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                            }`}
                                    >
                                        Previous
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`px-3 py-1 rounded-md ${currentPage === index + 1
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1 rounded-md ${currentPage === totalPages
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                            }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats; 