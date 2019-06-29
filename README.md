 <h1> :rocket: Google Summer Of Code 2019 </h1>

<h2> Problem Statement </h2>
 The process of thesis writing can play a significant role to a student’s life. So much consideration is required during this process, from the topic selection to final submission. Hard work, proper research and writing skills are obligatory for a successful outcome. The existing bureaucracy adds more complexity to thesis procedure, since thesis topics are not gathered in a specific website. Therefore each student have to contact every professor separately to learn his available thesis or in best case to visit professor’s website if he has uploaded them there. Moreover, every professor has many thesis topics assigned to supervised students and the tracking of their progress is difficult.

<h2> Abstract </h2>
 I propose the development of a web application that will support the whole lifecycle of a thesis creation, namely, a Thesis Management System(TMS) that will benefit the students as well as the professors. This proposed system aims at eliminating the time consuming procedures and paper work at the very basic level by encapsulating and automating them with in the web app. MoreoverTMS will provide the functionality of an open source digital repository of completed theses, where the student authors can share their work to a wide audience and may be cited more easily by companies and researchers in their academic community.


<h2> Timeline </h2>

 Milestones at the end of each [GSoC phase](https://developers.google.com/open-source/gsoc/timeline):

<h3>June 28, 2019 Phase 1 Evaluation:</h3>  

- Complete Database schema.
- Complete Models and Routes of the Backend system.
- API that supports the basic functionality of the system (student,supervisor register, topic creation, assign topic, submit topic).

<h3>July 26, 2019 Phase 2 Evaluation:</h3>

- Register and Log in components in the frontend.
- Basic user-interface for student and supervisor.
- Partial documentation of the system
- Tests that checks if the backend works properly

<h3>August 26, 2019 Final Evaluation:</h3>

- Functional user-interface and backend that supports all the roles of the TMS lifecycle
- Full documentation of the project
- Digital repository of completed thesis
- Integrated Chat between student and supervisor
- Tests


<h2> Contributors </h2>
 
 - Google Summer of Code participant: Michail Chatzianastasis
 - Mentor: Theodoros Karounos
 - Mentor: Iraklis Varlamis
 - Organization: [GFOSS](https://gfoss.eu/)
 
 
 <h2> Technologies used </h2>
 
The data are stored in MongoDB (document-oriented database schema) and is accessible through a RESTful API.

The <b>backend</b> is written in node js, using the following libraries: "bcrypt" , "body-parser" , "dotenv" , "express" , "jsonwebtoken", "mongodb" , "mongoose" ,"mongoose-paginate-v2" , "morgan" , "passport" , "passport-saml", "querystringify"

The <b>frontend</b> is written in angular7
    

<h2> License </h2> 
The project is opensourced as a part of the Google Summer of Code Program. Here, the MIT license is adopted. For more information see LICENSE.



