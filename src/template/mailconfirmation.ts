export const mailConfirmationTemplate = (username: any, uuid: any) => `
<h2>Howdy, ${username}!</h2>
<br>
<h4>This is Pinnel, the 🐧 over Chewbacca, you're one click away from joinning the dark side 😈</h4>
<h4>Please, confirm your email clicking on the porg.</h4>   
<div>
<a href="http:localhost:3000/mailconfirmation?token=${uuid}">

<img
src="https://media0.giphy.com/media/3h2lUwrZKilQKbAK6f/giphy.gif?cid=ecf05e47papq57otcejo7y7es8y0d1a5qcom8j5n6cyohxj8&rid=giphy.gif&ct=g"
width="480" height="201" frameBorder="0" class="giphy-embed"
>
</a>
</div>
<p>If you're not interested in joinning the dark side, ignore this email.</p>
`;
