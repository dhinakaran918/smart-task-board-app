using taskbordapi.Models;
using taskbordapi.Models.TaskBoardAPI.Models;

namespace TaskBoardAPI.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetTasks();
        Task<TaskItem> GetTask(int id);
        Task<TaskItem> AddTask(TaskItem task);
        Task<TaskItem> UpdateTask(TaskItem task);
        Task<bool> DeleteTask(int id);
    }
}