package com.IssueTracker.resources;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class IssueService {
  IssuesDao issuesDao;
  Map<String,IssueDetails> issuesDetails;
  public IssueService()
  {
	  issuesDao=IssuesDao.instance;
	  issuesDetails = new HashMap<String, IssueDetails>();
  }
  public void createIssue(IssueDetails issueDetails)
  {
	
	  issuesDao.getIssues().put(issueDetails.getId(), issueDetails);
	  issuesDetails=issuesDao.getIssues();
	  issuesDao.addIssue(issuesDetails);
  }
  public IssueDetails getIssue(String id) {
		return issuesDao.getIssues().get(id);
	}
  public Map<String, IssueDetails> getAllIssues() {
		return issuesDao.getIssues();
	}
  public List<IssueDetails> getAllIssuesAsList() {
		List<IssueDetails> issueDetailsList = new ArrayList<IssueDetails>();
		issueDetailsList.addAll(issuesDao.getIssues().values());
		return issueDetailsList;
	}
}
