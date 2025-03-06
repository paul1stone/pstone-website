# backend/app.py
import os
import traceback
import requests
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
if not ANTHROPIC_API_KEY:
    print("WARNING: No API key found! Please set the ANTHROPIC_API_KEY environment variable.")

# -----------------------
# Resume Data
# -----------------------
resume_data = {
    "name": "Paul Stone",
    "title": "Computer Science Student",
    "contact": {
        "phone": "540-395-6720",
        "email": "pws59@cornell.edu"
    },
    "summary": "Computer Science student at Cornell University with experience in Machine Learning, AI, and cloud technologies. Skilled in developing RAG-based chatbots and working with various AWS services.",
    "education": [
        {
            "degree": "B.S. in Computer Science",
            "institution": "Cornell University, College of Engineering",
            "duration": "August 2021 - May 2025",
            "coursework": "Data Structures, Algorithms, Machine Learning, Artificial Intelligence, Systems Programming, Database Systems, PLL"
        }
    ],
    "experience": [
        {
            "position": "Machine Learning Engineer Intern",
            "company": "Zeta Global",
            "duration": "June 2024 - August 2024",
            "responsibilities": [
                "Developed and optimized a RAG-based chat-bot using AWS Bedrock and Dockerized microservices for deployment",
                "Compared Assistant services performance across OpenAI/OpenAPI, AWS Bedrock, Claude, and other Large Language Models (LLM)",
                "Deployed scalable Kubernetes clusters",
                "Worked with CI/CD workflows for model training and deployment using GitHub Actions and Terraform",
                "Worked closely with other engineers to integrate AWS services (S3, EC2, Lambda) into existing systems using IAM roles and role-based access control (RBAC)",
                "Took part in daily stand-ups, code reviews, and the software development life cycle (SDLC)",
                "Created an in-depth guide for future maintenance and upgrades on the chat-bot development process"
            ]
        },
        {
            "position": "Research Assistant",
            "company": "Cornell University",
            "location": "Ithaca, NY",
            "duration": "February 2022 - May 2022",
            "responsibilities": [
                "Deployed a mesh network of distributed Internet of Things (IoT) microcontrollers across the Cornell campus to monitor energy usage which led to a 10% reduction in energy waste",
                "Developed the microcontroller software using C++ with MQTT-based communication",
                "Using data pipelines, visualized the data in graphs through Grafana dashboards"
            ]
        }
    ],
    "projects": [
        {
            "name": "Agario Game Clone",
            "duration": "Spring 2021 - Fall 2023",
            "description": [
                "Developed an online game similar to agar.io using Angular and TypeScript",
                "Implemented server communication through WebSockets which allowed for real-time gameplay",
                "Created a robust database using MongoDB to manage users, scores, and game statistics",
                "A local version was built using Docker which allowed for seamless unit tests and integration"
            ]
        },
        {
            "name": "Secret Santa App",
            "duration": "Fall 2021 - Spring 2022",
            "description": [
                "Led a team of developers in designing a Secret Santa app using Agile methodology",
                "Created Hamiltonian cycles to ensure that participant matching was optimal",
                "Utilized React, AWS, Firebase, and FastAPI to build the backend",
                "Created APIs and different design patterns to ensure perfect matching"
            ]
        }
    ],
    "skills": {
        "programming_languages": ["Python", "OCaml", "RISCV", "x86", "C/C++", "Java", "JavaScript", "TypeScript"],
        "web_development": ["HTML", "CSS", "PHP", "Svelte", "React", "Angular", "FastAPI", "Firebase"],
        "databases": ["MongoDB", "SQL", "MySQL", "NoSQL"],
        "cloud_services": ["AWS (S3, EC2, Lambda)", "Docker"],
        "tools": ["Vim", "VSCode", "Git", "JIRA"],
        "technical_knowledge": ["Networks", "Functional Programming", "Computer Architecture", "Artificial Intelligence", "Machine Learning", "System Design", "OpenAI", "LLMs"]
    },
    "extracurricular": [
        {
            "activity": "Varsity, Heavyweight Rowing, Cornell University",
            "details": [
                "Competed at the highest level of collegiate rowing",
                "Worked closely with my team to achieve results both on and off the water"
            ]
        }
    ]
}

# -----------------------
# Flask App Configuration
# -----------------------
# Serve static files from the ../build folder
app = Flask(__name__, static_folder="../build", static_url_path="")
CORS(app)  # If you need cross-origin requests; otherwise you can remove this


# -----------------------
# Helper: System Prompt
# -----------------------
def create_system_prompt():
    data = resume_data
    system_prompt = f"""You are an AI assistant representing {data['name']}. You should answer questions as if you are {data['name']}'s personal assistant who knows their professional background very well.

Here is {data['name']}'s resume and professional background:

NAME: {data['name']}
TITLE: {data['title']}
CONTACT: {data['contact']['email']} | {data['contact']['phone']}
SUMMARY: {data['summary']}

EDUCATION:
"""
    for edu in data['education']:
        system_prompt += f"- {edu['degree']} from {edu['institution']}, {edu['duration']}\n"
        system_prompt += f"  Relevant Coursework: {edu['coursework']}\n"

    system_prompt += "\nWORK EXPERIENCE:\n"
    for exp in data['experience']:
        system_prompt += f"- {exp['position']} at {exp['company']}, {exp['duration']}\n"
        for resp in exp['responsibilities']:
            system_prompt += f"  • {resp}\n"

    system_prompt += "\nPROJECTS:\n"
    for project in data['projects']:
        system_prompt += f"- {project['name']} ({project['duration']})\n"
        for desc in project['description']:
            system_prompt += f"  • {desc}\n"

    system_prompt += "\nTECHNICAL SKILLS:\n"
    system_prompt += f"- Programming Languages: {', '.join(data['skills']['programming_languages'])}\n"
    system_prompt += f"- Web Development: {', '.join(data['skills']['web_development'])}\n"
    system_prompt += f"- Databases: {', '.join(data['skills']['databases'])}\n"
    system_prompt += f"- Cloud Services: {', '.join(data['skills']['cloud_services'])}\n"
    system_prompt += f"- Tools & IDEs: {', '.join(data['skills']['tools'])}\n"
    system_prompt += f"- Technical Knowledge: {', '.join(data['skills']['technical_knowledge'])}\n"

    system_prompt += "\nEXTRACURRICULAR ACTIVITIES:\n"
    for activity in data['extracurricular']:
        system_prompt += f"- {activity['activity']}\n"
        for detail in activity['details']:
            system_prompt += f"  • {detail}\n"

    system_prompt += f"""

When answering questions, represent {data['name']} professionally and accurately based on this information. Highlight Paul's experience with ML/AI technologies including RAG chatbots when relevant. Emphasize his strengths in software development, cloud technologies, and machine learning.

If asked about something not in {data['name']}'s background, politely explain you don't have that information. Don't make up information that isn't provided here.

For questions about availability for interviews or meetings, indicate that you'd need to check with Paul directly but that he's generally interested in opportunities related to software engineering, machine learning engineering, and AI development.
"""
    return system_prompt


# -----------------------
# React App Serving Routes
# -----------------------
@app.route('/')
def serve_react_app():
    # Serve the main index.html from the build folder
    return send_from_directory('../build', 'index.html')


@app.errorhandler(404)
def not_found(e):
    # If a route is not found, serve the React app
    return send_from_directory('../build', 'index.html')


# -----------------------
# Test Endpoint
# -----------------------
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"status": "OK", "message": "Backend is working"}), 200


# -----------------------
# Main Chat Endpoint
# -----------------------
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        if not ANTHROPIC_API_KEY:
            return jsonify({
                'error': 'API key is missing. Please check your environment variables.'
            }), 500

        data = request.json
        messages = data.get('messages', [])
        if not messages:
            return jsonify({'error': 'No messages provided'}), 400

        # Generate system prompt
        system_prompt = create_system_prompt()

        # Prepare the request to Claude
        payload = {
            'model': 'claude-3-7-sonnet-20250219',
            'max_tokens': 1024,
            'system': system_prompt,
            'messages': messages
        }
        headers = {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
        }

        response = requests.post(
            'https://api.anthropic.com/v1/messages',
            json=payload,
            headers=headers,
            timeout=30
        )

        if response.status_code != 200:
            error_details = response.text
            try:
                error_json = response.json()
                if 'error' in error_json:
                    error_details = error_json['error'].get(
                        'message', error_details)
            except:
                pass

            return jsonify({
                'error': f'Claude API returned {response.status_code}',
                'details': error_details
            }), 500

        response_data = response.json()
        return jsonify(response_data)

    except requests.exceptions.Timeout:
        return jsonify({'error': 'Request to Claude API timed out'}), 504
    except requests.exceptions.ConnectionError:
        return jsonify({'error': 'Could not connect to Claude API'}), 503
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500


# -----------------------
# Simple Test Endpoint
# -----------------------
@app.route('/api/simple-response', methods=['POST'])
def simple_response():
    try:
        data = request.json
        user_message = "No message found"

        if data and 'messages' in data and len(data['messages']) > 0:
            for msg in reversed(data['messages']):
                if msg.get('role') == 'user':
                    user_message = msg.get('content', "No content")
                    break

        response_data = {
            "id": "msg_simulated",
            "content": [
                {
                    "type": "text",
                    "text": f"This is a simulated response to: \"{user_message}\". The actual Claude API connection isn't working, but your frontend and backend are communicating correctly."
                }
            ]
        }
        return jsonify(response_data)
    except Exception as e:
        print(f"Error in simple response: {str(e)}")
        return jsonify({'error': str(e)}), 500


# -----------------------
# Run the App Locally
# (In Production, use gunicorn or similar.)
# -----------------------
if __name__ == '__main__':
    # For local testing, you can do:
    app.run(debug=True, host='0.0.0.0', port=5000)
