import Image from "next/image";
import HeroSection from "./components/HeroSection";
import ContentWithCTA from "./components/ContentWithCTA";
import Columns from "./components/Columns";
import FeatureCard from "./components/FeatureCard";
import { BookOpen, Users, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <>
      <HeroSection
        title="Samorząd Uczniowski ZSCL"
        subtitle="Building the future of our school, together. Join us in making ZSCL a place for everyone."
        image="/images/baner.webp"
        primaryButtonText="Latest News"
        primaryButtonLink="/news"
        secondaryButtonText="Our Calendar"
        secondaryButtonLink="/calendar"
      />

      <ContentWithCTA
        title="Samorząd Uczniowski ZSCL"
        content="Building the future of our school, together. Join us in making ZSCL a place for everyone."
        ctaButton="Latest News"
        ctaButtonLink="/news"
      />

      <Columns count={3}>
        <FeatureCard
          icon={BookOpen}
          title="Student Rights"
          description="Download the official handbook and learn about your rights and responsibilities on campus."
        />
        <FeatureCard
          icon={Users}
          title="School Clubs"
          description="Find your community. Browse our directory of over 20 active student organizations."
        />
        <FeatureCard
          icon={MessageSquare}
          title="Contact Reps"
          description="Have a suggestion? Get in touch directly with your student council representatives."
        />
      </Columns>
    </>
  );
}
