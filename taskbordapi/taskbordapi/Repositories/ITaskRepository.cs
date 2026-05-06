using taskbordapi.Models;
using taskbordapi.Models.TaskBoardAPI.Models;

namespace TaskBoardAPI.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetAll();
        Task<TaskItem> GetById(int id);
        Task<TaskItem> Create(TaskItem task);
        Task<TaskItem> Update(TaskItem task);
        Task<bool> Delete(int id);
    }
}