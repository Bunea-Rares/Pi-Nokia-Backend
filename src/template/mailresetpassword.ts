export const mailResetPassword = (username: any, uuid: any, email: any) => `
<h2>Howdy, ${username}!</h2>
<br>
<h4>This is Pinnel, the 🐧 over Chewbacca, you've got lost, but we've got your back!😉</h4>
<h4>To reset your password click the porg!</h4>
<div>
<a href="http:localhost:3000/password-reset?token=${uuid}&email=${email}">

<img
src="https://media0.giphy.com/media/3h2lUwrZKilQKbAK6f/giphy.gif?cid=ecf05e47papq57otcejo7y7es8y0d1a5qcom8j5n6cyohxj8&rid=giphy.gif&ct=g"
width="480" height="201" frameBorder="0" class="giphy-embed"
>
</a>
</div>
<p>Welcome back! 😈</p>
`;
