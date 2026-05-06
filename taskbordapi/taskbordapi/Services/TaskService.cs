using taskbordapi.Models;
using TaskBoardAPI.Repositories;
using taskbordapi.Models.TaskBoardAPI.Models;

namespace TaskBoardAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repo;

        public TaskService(ITaskRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<TaskItem>> GetTasks()
        {
            return await _repo.GetAll();
        }

        public async Task<TaskItem> GetTask(int id)
        {
            return await _repo.GetById(id);
        }

        public async Task<TaskItem> AddTask(TaskItem task)
        {
            return await _repo.Create(task);
        }

        public async Task<TaskItem> UpdateTask(TaskItem task)
        {
            task.UpdatedAt = DateTime.Now;
            return await _repo.Update(task);
        }

        public async Task<bool> DeleteTask(int id)
        {
            return await _repo.Delete(id);
        }
    }
}