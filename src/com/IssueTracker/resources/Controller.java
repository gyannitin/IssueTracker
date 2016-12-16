package com.IssueTracker.resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("Issues")
public class Controller {
	IssueService issueService;
	public Controller(){
		issueService =new IssueService();
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON })
	public List<IssueDetails> getAllIssues() {
		return issueService.getAllIssuesAsList();
	}
	@POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
    @Path("/addIssue")
    public String addIssue(IssueDetails issueDetails) {
        try{
		issueService.createIssue(issueDetails);
        return "added";
        }catch(Exception e)
        {
        	return "error";
        }
        
    }
}
