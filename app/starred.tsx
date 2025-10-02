import MailListScreen from "@/components/ui/MailListScreen";

const Starred = () => {
  return (
    <MailListScreen
      title="Starred"
      endpoint="/starred"
      emptyImage={require("@/assets/images/empty-inbox.png")}
      emptyText="No starred emails"
      emptySubtext="Tap the star icon on a mail to save it here."
    />
  );
};

export default Starred;
