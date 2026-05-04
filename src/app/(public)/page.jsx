import ContactSection from "@/components/public/ContactSection";
import FeaturedCollections from "@/components/public/Featured";
import Hero from "@/components/public/Hero";
import InfiniteReviewLoop from "@/components/public/ReivewSection";

const PublicPage = () => {
  return (
    <section>
      <Hero></Hero>
      <FeaturedCollections></FeaturedCollections>
      <InfiniteReviewLoop></InfiniteReviewLoop>
      <ContactSection></ContactSection>
    </section>
  );
};

export default PublicPage;
