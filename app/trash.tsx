import MailListScreen from "@/components/ui/MailListScreen";

const Trash = () => {
  return (
    <MailListScreen
      title="Trash"
      endpoint="/deleted"
      emptyImage={require("@/assets/images/empty-inbox.png")}
      emptyText="Trash is empty!"
      emptySubtext="Swipe left on any email in the inbox to save it here."
    />
  );
};

export default Trash;
