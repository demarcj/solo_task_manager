import { TaskPage } from '@/components/main/task_page';

interface TaskModel {
  id: string;
}

const Page = async ({ params }: { params: Promise<TaskModel> }) => {
  const { id } = await params;
  return <TaskPage />;
}

export default Page;
