<svelte:head>
  <title>Phobos - About</title>
</svelte:head>

<!--
  A container is needed since we want the content to have a gap, but we can't set it on <main>
  without messing with other pages.
 -->
<div class="container">
  <div class="mg heading">
    <h1>About</h1>
  </div>

  <div class="mg about">
    <div>
      <p>
        Phobos is an online maths visualization tool created by Destructor_Ben,
        intended for use by Maths students in New Zealand studying NCEA or at university.
      </p>
      
      <br />
      <p>
        Phobos includes visualizations of various mathematical concepts to help visual learners
        better understand maths, since not everyone learns best through textbooks, lectures, or classrooms.

        One key focus of Phobos is to make these visualizations interactive, since simply looking at a diagram
        isn't enough for someone to grasp a concept, but interacting with it can make something click.
        Simply observing is usually not enough.
      </p>

      <br />
      <p>
        Phobos is completely open source, and the code is available on <a href="https://github.com/Destructor-Ben/L3COSC-Maths-Website">GitHub</a>.
        It is also licensed under the MIT license.
      </p>

      <br />
      <p>
        Phobos was also initially created as a project for the Level 3 Computer Science course at my school,
        though I have plans to continue developing it and make it more than just a school project.
      </p>

      <hr />
    </div>
  </div>
</div>

<style>
  .container {
    /* Grow to fill the parent container */
    flex: 1;

    /* Set flex styles, including gap (which can't be set on <main> without messing with other pages) */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
  }

  .heading {
    /* Text being too wide makes it hard to read */
    width: var(--article-width);
  }

  .about {
    /* Text being too wide makes it hard to read */
    width: var(--article-width);
    
    /* Text requires a larger amount of padding to look nice */
    padding: var(--article-padding);

    /* Fixes the horizontal rule adding making the div seem too large */
    hr {
      margin-bottom: 0;
    }
  }
</style>

