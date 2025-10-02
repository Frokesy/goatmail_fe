import MailListScreen from "@/components/ui/MailListScreen";

const Archived = () => {
  return (
    <MailListScreen
      title="Archive"
      endpoint="/archived"
      emptyImage={require("@/assets/images/empty-inbox.png")}
      emptyText="No archived emails"
      emptySubtext="Swipe left on any email in the inbox to save it here."
    />
  );
};

export default Archived;
