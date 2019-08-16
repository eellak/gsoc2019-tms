 <h1> :rocket: Google Summer Of Code 2019 </h1>
 <h2> Development of a Thesis Management System (TMS) </h2>


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
 
 - Google Summer of Code participant: [Michail Chatzianastasis](https://github.com/MichailChatzianastasis)
 - Mentor: [Theodoros Karounos](https://github.com/tgkarounos)
 - Mentor: [Iraklis Varlamis](https://github.com/varlamis)
 - Mentor: [Georgia Kapitsaki](https://github.com/gkapi)
 - Organization: [GFOSS](https://gfoss.eu/)
 
 <h2> Overview </h2>
 
 - [Architecture Design](https://github.com/eellak/gsoc2019-tms/wiki/Architecture-Design)
 - [API Documentation](https://github.com/eellak/gsoc2019-tms/wiki/API-Documentation)
 - [SSO Documentation](https://github.com/eellak/gsoc2019-tms/wiki/Single-Sign-On-Documentation)

 
 <h2> Technologies used </h2>
 
The data are stored in MongoDB (document-oriented database schema) and is accessible through a RESTful API.

The <b>backend</b> is written in node js, using the following libraries: [bcrypt](https://www.npmjs.com/package/bcrypt) , [body-parser](https://www.npmjs.com/package/body-parser) , [dotenv](https://www.npmjs.com/package/dotenv) , [express](https://www.npmjs.com/package/express) ,
 [form-data](https://www.npmjs.com/package/form-data) ,[formidable](https://www.npmjs.com/package/formidable),[lodash](https://www.npmjs.com/package/lodash) , [multer](https://www.npmjs.com/package/multer) , [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [mongodb](https://www.npmjs.com/package/mongodb) , [mongoose](https://www.npmjs.com/package/mongoose) , [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) , [morgan](https://www.npmjs.com/package/morgan) , [passport](https://www.npmjs.com/package/passport) , [passport-saml](https://www.npmjs.com/package/passport-saml), [querystringify](https://www.npmjs.com/package/querystringify)

The <b>frontend</b> is written in angular7, using the following modules: [@angular/core](https://www.npmjs.com/package/@angular/core) , [@angular/common](https://www.npmjs.com/package/@angular/common) , [@angular/compiler](https://www.npmjs.com/package/@angular/compiler) , [@angular/compiler-cli](https://www.npmjs.com/package/@angular/compiler-cli) , [@angular/forms](https://www.npmjs.com/package/@angular/forms) , [@angular/http](https://www.npmjs.com/package/@angular/http) , [@angular/platform-browser](https://angular.io/api/platform-browser) , , [@angular/platform-browser-dynamic](https://www.npmjs.com/package/@angular/platform-browser-dynamic)  , [@angular/platform-server](https://www.npmjs.com/package/@angular/platform-server) , [@angular/router](https://www.npmjs.com/package/@angular/router) , [@angular/animations](https://www.npmjs.com/package/@angular/animations) , [@angular/upgrade](https://www.npmjs.com/package/@angular/upgrade) , [@angular/material](https://www.npmjs.com/package/@angular/material) , [rxjs](https://www.npmjs.com/package/rxjs) , [tslib](https://www.npmjs.com/package/tslib) , [zone.js](https://www.npmjs.com/package/zone.js?activeTab=readme) , [bootstrap@3](https://www.npmjs.com/package/bootstrap) , [@ng-bootstrap/ng-bootstrap](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap)
    
<h2> License </h2> 
The project is opensourced as a part of the Google Summer of Code Program. Here, the MIT license is adopted. For more information see LICENSE.



