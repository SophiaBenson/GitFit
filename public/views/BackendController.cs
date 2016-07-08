public class BackendController : Controller
{
  CalendarDataContext db = new CalendarDataContext();

  public class JsonEvent
  {
      public string id { get; set; }
      public string text { get; set; }
      public string start { get; set; }
      public string end { get; set; }
  }


  public ActionResult Events(DateTime? start, DateTime? end)
  {

      // SQL: SELECT * FROM [event] WHERE NOT (([end] <= @start) OR ([start] >= @end))
      var events = from ev in db.Events.AsEnumerable() where !(ev.End <= start || ev.Start >= end) select ev;

      var result = events
      .Select(e => new JsonEvent()
      {
          start = e.Start.ToString("s"),
          end = e.End.ToString("s"),
          text = e.Text,
          id = e.Id.ToString()
      })
      .ToList();

      return new JsonResult { Data = result };
  }

}
