import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { sendMail } from "../modules/sendmail";
import { mailConfirmationTemplate } from "../template/mailconfirmation";
import { mailResetPassword } from "../template/mailresetpassword";

export const createUser = async (req: any, res: any) => {
  // const user = await prisma.user.create({
  //   data: {
  // username: req.body.username,
  // password: await hashPassword(req.body.password),
  // email: req.body.email,
  //   },
  // });

  try {
    const user = await prisma.tokenMailConfirmation.create({
      data: {
        user: {
          create: {
            username: req.body.username,
            password: await hashPassword(req.body.password),
            email: req.body.email,
          },
        },
      },
      include: {
        user: true,
      },
    });
    sendMail(
      user.user.email,
      `You're one click away from the Dark Side 😈`,
      mailConfirmationTemplate(user.user.username, user.token)
    );
    res.json("We've mailed you a confirmation link!");
  } catch (e: any) {
    res.status(401);
    res.json(e);
  }
};

export const signIn = async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    const isValid = await comparePasswords(req.body.password, user?.password);

    if (!isValid) {
      res.status(401);
      res.json({ message: "Wrong password or username" });
      return;
    }

    if (user?.status == false) {
      res.status(401);
      res.json({ message: "Please confirm your email" });
      return;
    }

    const token = createJWT(user);
    res.json({ token });
  } catch (e: any) {
    res.status(401);
    res.json(e);
  }
};

export const confirmMail = async (req: any, res: any) => {
  try {
    const toConfirm = await prisma.tokenMailConfirmation.delete({
      where: {
        token: req.query.token,
      },
    });
    const user = await prisma.user.update({
      where: {
        id: toConfirm.userId,
      },
      data: {
        status: true,
      },
    });
    const token = createJWT(user);
    res.json(token);
  } catch (e: any) {
    res.status(401);
    res.json(e);
  }
};

export const sendPasswordReset = async (req: any, res: any) => {
  try {
    const token = await prisma.tokenPasswordReset.create({
      data: {
        user: {
          connect: { email: "test@test.com" },
        },
      },
      include: {
        user: true,
      },
    });
    sendMail(
      req.body.email,
      "Coming back to the Dark Side💀",
      mailResetPassword(token.user.username, token.token, req.body.email)
    );
    res.json("We've mailed you the password reset link");
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};

export const handlePasswordReset = async (req: any, res: any) => {
  try {
    const token = await prisma.tokenPasswordReset.delete({
      where: {
        userEmail_token: {
          userEmail: req.query.email,
          token: req.query.token,
        },
      },
    });
    await prisma.user.update({
      where: {
        email: token.userEmail,
      },
      data: {
        password: await hashPassword(req.body.password),
      },
    });
    res.json("Password changed! You can now login using the new password");
  } catch (e: any) {
    res.json(401);
    res.json(e);
  }
};
