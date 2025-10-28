import MailListScreen from '@/components/ui/MailListScreen';

const Spam = () => {
  return (
    <MailListScreen
      title="Spam"
      endpoint="/spam"
      emptyImage={require('@/assets/images/empty-inbox.png')}
      emptyText="No spam emails"
      emptySubtext="No new messages in your spam. Check back later."
    />
  );
};

export default Spam;
