import prisma from "@/lib/prisma";
import {
  ContributionType,
  StoryTopic,
  StoryType,
  type Story,
} from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import slug from "slug";
import { postStorySchema } from "./schema";
import { GET as getSearchStories } from "./search/route";

export type Stories = (Story & {
  storyContributions: {
    user: {
      firstName: string;
      lastName: string;
    };
    contributionType: ContributionType;
  }[];
})[];

export type GetStoriesResult = {
  stories: Stories;
  page_number: number;
  total_pages: number;
};

export async function GET(req: Request) {
  return getSearchStories(req);
}

export async function POST(request: NextRequest) {
  const timestamp = new Date();
  const parsedBody = postStorySchema.safeParse(await request.json());
  if (!parsedBody.success) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const { title, content } = parsedBody.data;

  const user = await prisma.user.findFirst({});
  if (!user) {
    return NextResponse.json({ error: "No user available" }, { status: 500 });
  }

  const storyContribution = await prisma.storyContribution.create({
    data: {
      user: { connect: { id: user.id } },
      story: {
        create: {
          storyType: StoryType.ARTICLE,
          title,
          titleColor: "#ffffff",
          slug: slug(title),
          summary: `summary of ${title}`,
          summaryColor: "#ffffff",
          tags: [StoryTopic.ASTRONOMY],
          published: true,
          staffPick: Math.random() > 0.5,
          thumbnailUrl: "/assets/images/bobtail.png",
          createdAt: timestamp,
          publishedAt: timestamp,
          updatedAt: timestamp,
        },
      },
      contributionType: ContributionType.AUTHOR,
    },
  });

  await prisma.storyContent.create({
    data: {
      story: { connect: { id: storyContribution.storyId } },
      content,
      createdAt: timestamp,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
