<template>
  <div class="content about">
    <h1>About me</h1>
    <p>
      Hello and welcome to my website. My name is Luís Pereira, also known in
      the internet as Kimossab.<br />
      I'm a {{ age }} years old programmer from Portugal.<br />
    </p>
    <p>
      I've been working as a full-stack developer ever since I finished
      Bachelor's Degree of Informatics Engineering in
      <a href="https://www.estgv.ipv.pt/estgv/" target="_blank">IPV</a>.
    </p>
    <p>
      My hobbies are programming, playing video games, watching anime and
      reading Light Novels.<br />
      I really enjoy creating stuff and learning how things work through trial
      and error, just like my discord bot and this webpage.<br />
    </p>
    <details class="work-experience">
      <summary>Work Experience</summary>
      <div class="details-content">
        <div class="period">
          <div class="date">Jun. 2016 - Feb. 2021</div>
          <div class="place">
            Full Stack Developer at
            <a href="https://tomiworld.com" target="_blank">TOMI WORLD</a>
          </div>
        </div>
        <div class="description">
          Web and .NET developer.<br />
          Major projects:<br />
          <ul>
            <li>
              Backoffice & Dashboard: Maintenance and improvement of the
              company’s backoffice. Laravel and Vue.JS project using PHP,
              Javascript and MySQL.
            </li>
            <li>
              TOMI Manager: Maintenance and improvement of the software for
              management and control of all other software in the TOMI machines.
              Windows forms project using C#.
            </li>
            <li>
              TOMI: Improvement of the photo module. Creation of the touch
              feedback log module for statistics and false touches detection.
              WPF project using C#, XAML and SQLite.
            </li>
            <li>
              Penalty kick mini game: Creation of a 2D mini game for scoring
              penalty kicks through screen touches. Project integrated on TOMI
              during Football World Cup 2018. Used Javascript with phaser
              framework and electron to create an executable.
            </li>
            <li>
              TOMI Checkout: Creation of a webpage and server to create, execute
              and manage purchase operations with TOMI. Integration with SIBS
              API and paypal for payment. React project using for the client and
              Node js project for the server
            </li>
          </ul>
        </div>
      </div>
      <div class="details-content">
        <div class="period">
          <div class="date">Feb. 2016 - Jul. 2016</div>
          <div class="place">
            Curricular Internship at
            <a href="https://tomiworld.com" target="_blank">TOMI WORLD</a>
          </div>
        </div>
        <div class="description">
          Internship in a company as part of my course in the polytechnic,
          evaluated both by the company and polytechnic. Internship project
          consisted of developing a virtual visit module in WPF to use in some
          company’s machines. This module had to show panoramas from a point of
          view using a cube with panoramic images as textures. The user could
          interact through touches to alter the FOV and direction. The project
          was done in WPF using C# and XAML.
        </div>
      </div>
    </details>
    <details class="education">
      <summary>Education</summary>
      <div class="details-content">
        <div class="period">
          <div class="date">Sep. 2013 - Jul. 2016</div>
          <div class="place">
            Informatics Engineering at
            <a href="http://www.estgv.ipv.pt/estgv" target="_blank"
              >ESCOLA SUPERIOR DE TECNOLOGIA E GESTÃO DE VISEU - INSTITUTO
              POLITÉCNICO DE VISEU</a
            >
          </div>
        </div>
        <div class="description">
          <p>
            3 year Bachelor's degree in Informatics Engineering with a final
            grade of 14 out of 20.
          </p>
          <p>
            Polytechnic based in Viseu, Portugal. More details about the course
            can be found in:
            <a href="http://www.estgv.ipv.pt/estgv/?v=194" target="_blank"
              >http://www.estgv.ipv.pt/estgv/?v=194</a
            >
          </p>
          <p>
            The course consists of advanced mathematics, communication
            technologies, programming, statistics, database and server
            administration, usability, networking, software development,
            security and basic AI.
          </p>
          <p>
            During the course I have gained knowledge and experience in the
            following programming technologies: C, C++, C#, PHP, Javascript,
            HTML, CSS, Android development (Java), MySQL, SQLServer, PL/SQL,
            Prolog, Matlab, X86 Assembly.<br />
            Other than programming languages I gained knowledge in network
            management, server management, communication protocols and usability
          </p>
        </div>
      </div>
    </details>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import DetailsAnimation from "@/helpers/DetailsAnimation";

export default class About extends Vue {
  private get age() {
    const bDay = +new Date(1995, 11, 30);

    const ageDifMs = Date.now() - bDay;
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  mounted() {
    const details = document.querySelectorAll("details");
    for (const el of details) {
      new DetailsAnimation(el);
    }
  }
}
</script>

<style lang="scss" scoped>
.details-content {
  display: flex;

  .period {
    border-right: 1px solid grey;
    margin-right: 1rem;
    padding-right: 1rem;
    flex-shrink: 0;
    width: 10rem;

    .date {
      font-weight: bold;
    }
  }
}
</style>
