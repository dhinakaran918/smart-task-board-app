//using Microsoft.AspNetCore.Mvc;
//using taskbordapi.Models;
//using TaskBoardAPI.Services;
//using taskbordapi.Models.TaskBoardAPI.Models;

//namespace TaskBoardAPI.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class TaskController : ControllerBase
//    {
//        private readonly ITaskService _service;

//        public TaskController(ITaskService service)
//        {
//            _service = service;
//        }

//        [HttpGet]
//        public async Task<IActionResult> GetAll()
//        {
//            var tasks = await _service.GetTasks();
//            return Ok(tasks);
//        }

//        [HttpGet("{id}")]
//        public async Task<IActionResult> Get(int id)
//        {
//            var task = await _service.GetTask(id);
//            if (task == null) return NotFound();
//            return Ok(task);
//        }

//        [HttpPost]
//        public async Task<IActionResult> Create(TaskItem task)
//        {
//            var created = await _service.AddTask(task);
//            return Ok(created);
//        }

//        [HttpPut]
//        public async Task<IActionResult> Update(TaskItem task)
//        {
//            var updated = await _service.UpdateTask(task);
//            return Ok(updated);
//        }

//        [HttpDelete("{id}")]
//        public async Task<IActionResult> Delete(int id)
//        {
//            var result = await _service.DeleteTask(id);
//            if (!result) return NotFound();
//            return Ok("Deleted successfully");
//        }
//    }
//}
using Microsoft.AspNetCore.Mvc;
using TaskBoardAPI.Services;
using taskbordapi.Models.TaskBoardAPI.Models;

[Route("api/tasks")]
[ApiController]
public class TaskController : ControllerBase
{
    private readonly ITaskService _service;

    public TaskController(ITaskService service)
    {
        _service = service;
    }

    // GET: 
    [HttpGet("getalltaskapi")]
    public async Task<IActionResult> GetAllTasks()
    {
        var tasks = await _service.GetTasks();
        return Ok(tasks);
    }

    // GET: 
    [HttpGet("getbytaskidapi/{id}")]
    public async Task<IActionResult> GetTaskById(int id)
    {
        var task = await _service.GetTask(id);
        if (task == null) return NotFound();
        return Ok(task);
    }

    // POST:
    [HttpPost("createtaskapi")]
    public async Task<IActionResult> CreateTask(TaskItem task)
    {
        var created = await _service.AddTask(task);
        return Ok(created);
    }

    // PUT:
    [HttpPut("updatetaskapi/{id}")]
    public async Task<IActionResult> UpdateTask(int id, TaskItem task)
    {
        if (id != task.Id) return BadRequest();

        var updated = await _service.UpdateTask(task);
        return Ok(updated);
    }

    // DELETE:
    [HttpDelete("deletetaskapi/{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var result = await _service.DeleteTask(id);
        if (!result) return NotFound();
        return Ok("Deleted successfully");
    }
}