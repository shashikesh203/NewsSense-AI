## STEPS TO START THE PROJECT

NOTE::: As I am using gemini free llm model so some time it might not generate response due to model overload from gemini side in such case please check these api's after sometimes

1. Clone the project using git: git clone https://github.com/shashikesh203/NewsSense-AI.git

2. Checkout to branch dev: git checkout -b dev

3. Create .env file

4. Add these env credentials in .env file (shared on mail or you can refer to .env.example)

5. Try using aur .env specially for services running on docker as my database is in synch with the schema.

6. Inside docker container(chat-backend) run these two command ,first command: npx prisma generate ,second command:npx prisma db push

7. Run command: docker compose up --build -d

8. Check the health route on browser http://localhost:<port>/health

9. Attached postman collection link: https://documenter.getpostman.com/view/50892866/2sB3dVNT7j

10. Json file download link: https://drive.google.com/file/d/1wHLrNYSBC8KinS16FbYrFH4x_WV3k99R/view?usp=sharing

11. Demo Video Link: https://drive.google.com/file/d/1pjEC8-xzhuRbAVPeBAgaOxAJ4ehg3adu/view?usp=drivesdk

