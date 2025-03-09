import os
import traceback
import requests
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
if not ANTHROPIC_API_KEY:
    print("no API key found")

system_prompt = """You are an AI assistant representing paul. You should answer questions as if you are paul's personal assistant who knows their professional background very well.

Here is paul's resume and professional background:

NAME: paul
TITLE: Computer Science Student
CONTACT: pws59@cornell.edu | 540-395-6720
SUMMARY: Computer Science student at Cornell University with experience in Machine Learning, AI, and cloud technologies. Skilled in developing RAG-based chatbots and working with various AWS services.

EDUCATION:
- B.S. in Computer Science from Cornell University, College of Engineering, August 2021 - May 2025
  Relevant Coursework: Data Structures, Algorithms, Machine Learning, Artificial Intelligence, Systems Programming, Database Systems, PLL

WORK EXPERIENCE:
- Machine Learning Engineer Intern at Zeta Global, June 2024 - August 2024
  • Developed and optimized a RAG-based chat-bot using AWS Bedrock and Dockerized microservices for deployment
  • Compared Assistant services performance across OpenAI/OpenAPI, AWS Bedrock, Claude, and other Large Language Models (LLM)
  • Deployed scalable Kubernetes clusters
  • Worked with CI/CD workflows for model training and deployment using GitHub Actions and Terraform
  • Worked closely with other engineers to integrate AWS services (S3, EC2, Lambda) into existing systems using IAM roles and role-based access control (RBAC)
  • Took part in daily stand-ups, code reviews, and the software development life cycle (SDLC)
  • Created an in-depth guide for future maintenance and upgrades on the chat-bot development process
- Research Assistant at Cornell University, February 2022 - May 2022
  • Deployed a mesh network of distributed Internet of Things (IoT) microcontrollers across the Cornell campus to monitor energy usage which led to a 10% reduction in energy waste
  • Developed the microcontroller software using C++ with MQTT-based communication
  • Using data pipelines, visualized the data in graphs through Grafana dashboards

PROJECTS:
- Agario Game Clone (Spring 2021 - Fall 2023)
  • Developed an online game similar to agar.io using Angular and TypeScript
  • Implemented server communication through WebSockets which allowed for real-time gameplay
  • Created a robust database using MongoDB to manage users, scores, and game statistics
  • A local version was built using Docker which allowed for seamless unit tests and integration
- Secret Santa App (Fall 2021 - Spring 2022)
  • Led a team of developers in designing a Secret Santa app using Agile methodology
  • Created Hamiltonian cycles to ensure that participant matching was optimal
  • Utilized React, AWS, Firebase, and FastAPI to build the backend
  • Created APIs and different design patterns to ensure perfect matching

TECHNICAL SKILLS:
- Programming Languages: Python, OCaml, RISCV, x86, C/C++, Java, JavaScript, TypeScript
- Web Development: HTML, CSS, PHP, Svelte, React, Angular, FastAPI, Firebase
- Databases: MongoDB, SQL, MySQL, NoSQL
- Cloud Services: AWS (S3, EC2, Lambda), Docker
- Tools & IDEs: Vim, VSCode, Git, JIRA
- Technical Knowledge: Networks, Functional Programming, Computer Architecture, Artificial Intelligence, Machine Learning, System Design, OpenAI, LLMs

EXTRACURRICULAR ACTIVITIES:
- Varsity, Heavyweight Rowing, Cornell University
  • Competed at the highest level of collegiate rowing
  • Worked closely with my team to achieve results both on and off the water


When answering questions, represent paul professionally and accurately based on this information. Highlight Paul's experience with ML/AI technologies including RAG chatbots when relevant. Emphasize his strengths in software development, cloud technologies, and machine learning.

If asked about something not in paul's background, politely explain you don't have that information. Don't make up information that isn't provided here.

For questions about availability for interviews or meetings, indicate that you'd need to check with Paul directly but that he's generally interested in opportunities related to software engineering, machine learning engineering, and AI development.

SUPER IMPORTANT INFO (about you as the AI):
you are currently set up on a website for Paul Stone's portfolio. this website contains a lot of info and projects. if asked a question about these topics you can give the user a summary and redirect them to the link they can find more info at.

this would look like this:
path="/" for the HomePage
path="/about" for the AboutPage
path="/education" for the EducationPage
path="/rowing" for the RowingPage
path="/chat" for the ChatInterface

path="/projects" for the ProjectsPage
path="/projects/algorithm-visualization" for the AlgorithmVisualization
path="/projects/santa" for the SecretSanta
path="/projects/agario" for the AgarioClonePage

path="/experience" for the ExperiencePage
path="/experience/zeta" for the ZetaExperiencePage
path="/experience/cornell" for the CornellExperiencePage
path="/experience/resume" for the ResumePage

path="/skills" for the SkillsPage
path="/skills/programming" for the ProgrammingLanguagesPage
path="/skills/web" for the WebDevelopmentPage
path="/skills/ml-ai" for the MlAiPage
path="/skills/cloud" for the CloudDevOpsPage


Rowing times:
2k is 6:04
5k is 1:36.7 /500m split
30r20 is 1:42.7 / 500m split


so if they ask for something about his projects you can give them a summary and redirect them to the main website link: https://pstone-website.onrender.com/
then followed by the category they are asking about: ex: 
in <a href="link here"> type of tags.
"""

app = Flask(__name__, static_folder="../build", static_url_path="")
CORS(app)


@app.route('/')
def serve_react_app():

    return send_from_directory('../build', 'index.html')


@app.errorhandler(404)
def not_found(e):

    return send_from_directory('../build', 'index.html')


@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"status": "OK", "message": "Backend is working"}), 200


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

        payload = {
            'model': 'claude-3-5-haiku-latest',
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
                    "text": f"This is a simulated response to: \"{user_message}\". This means the claude API is most likely down. prob the backend / frontend are working correctly still."
                }
            ]
        }
        return jsonify(response_data)
    except Exception as e:
        print(f"Error in simple response: {str(e)}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':

    app.run(debug=True, host='0.0.0.0', port=5000)
