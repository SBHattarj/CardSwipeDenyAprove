# Project Swipe Aprove Deny App

This project was created for a task given by an employer, thus I feel the need to explain my though process regarding this project and how I went about making this work, hopefully this would be the first thing they read before checking the actual code.

Firstly the following the video who's design was to be replicated in react native: https://www.youtube.com/watch?v=OdE3aozD-hU

Now after replicating the design the following is the video screen recording of the app working properly side by side with the video: https://drive.google.com/file/d/1eUQVNZ03HiKBiP1OI-moI3s1THXa6qx_/view?usp=drive_link

Now As far as my thought proccess went, it's as follows:

1. I watched the video and ascertained the parameters for me to use for the app, they are all listed in the [videoExplanation.md](./videoExplanation.md). That file is just me thinking isn't the most readable, I used the file as a sort of notebook.

2. To allow the cards to be any size, I opted to take the front card as the standard card size, and then I got the factors between the different cards, so that I can potentially use scale to just scale the different cards, which after the calculations were done I was delighted to see was possible.

3. I also put the card icons to be relative to the height of the card to make it easier to scale, as the height was a nice round figure.

4. I first looked at the video multiple times to find relation between the motions, and wanted to decrease the amount of manual change I'll have to do, by defining most animation as a derived/Interpolation of the main animation. In this case this main animation was linked to the pan gesture of the user, and it primarily affected it's x location, because the y seemed to be selected as such the center of the card was relativly close to the center if not at the center even after the card rotated by 45 deg.

5. I also needed to allow the card be affected by the card right before it, as it's scale changes while the other card moves, also it's y translation changed in accordance to the same.

6. So What I decided to use was refs, where each component will use ref of it's previous component and change it's y transition.

7. Now this could have been allowed to be set by the outer component where, it'll provide all of the X transitions and Y transitions, but I opted to allow the child take the responsibility as it was the quickest and easiest way to do so, and at the time I couldn't think of any idea that wouldn't require too much more code.

8. There is also another thing, I chose to destroy the component when it's x transition hit a threshold where it's likely to be outside the bonds of the screen, as such I made it so when that happens the next component will be in appropriate position.

9. I also had to use some trial and error, for the card to stay relatively center while it rotates. That required me unfortunately use a lot of arbitrary values.

10. I have used a lot of useMemo, although I think I used them properly, I'll admit that I might have used a little too much of them, and maybe using less of them would be more optimal in the longer run, that however will require some testing, and for now my implementation should be good enough.

11. I also changed the dimensions of the card, as I used the app called waydroid on linux as the android emulator, which allows me to have any resolution but the relative resolution of my monitor somehow disallowed me to use the appropriate dimension, it's likely caused by dpi. As far as I understand react native uses dpi as an unit by default, to allow it self to be pseudo responsive to screen sizes.

12. I also tried to make this app be somewhat responsive to screen sizes, but it's actual size is fixed, and in certain screen sizes it's bond to look bad.

That is pretty much my thought proccess in making this project.
