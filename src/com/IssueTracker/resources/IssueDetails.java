package com.IssueTracker.resources;
/**
 * 
 * @author muthu_subbiah
 *Id
 *Project team
 *Asset name
 *AssetID
 *Implementation Date
 *Issue Description
 *Classification     
   Status
   SMEs
   server impacted
   Repeated                    
   Suggestion
 */
public class IssueDetails {
	
	public IssueDetails()
	{
		
	}
	public IssueDetails(String id, String projectTeam, String assetName, String assetID, String impDate,
			String issueDesc, String classification, String status, String sMEs, String serverimpacted, String repeated,
			String suggestion) {
		super();
		this.id = id;
		this.projectTeam = projectTeam;
		this.assetName = assetName;
		this.assetID = assetID;
		this.impDate = impDate;
		this.issueDesc = issueDesc;
		this.classification = classification;
		this.status = status;
		this.sMEs = sMEs;
		this.serverimpacted = serverimpacted;
		this.repeated = repeated;
		this.suggestion = suggestion;
	}
	private String id;
    private String projectTeam;
    private String assetName;
    private String assetID;
    private String impDate;
    private String issueDesc;
    private String classification;
    private String status;
    private String sMEs;
    private String serverimpacted;
    private String repeated;
    private String suggestion;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjectTeam() {
		return projectTeam;
	}
	public void setProjectTeam(String projectTeam) {
		this.projectTeam = projectTeam;
	}
	public String getAssetName() {
		return assetName;
	}
	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}
	public String getAssetID() {
		return assetID;
	}
	public void setAssetID(String assetID) {
		this.assetID = assetID;
	}
	public String getImpDate() {
		return impDate;
	}
	public void setImpDate(String impDate) {
		this.impDate = impDate;
	}
	public String getIssueDesc() {
		return issueDesc;
	}
	public void setIssueDesc(String issueDesc) {
		this.issueDesc = issueDesc;
	}
	public String getClassification() {
		return classification;
	}
	public void setClassification(String classification) {
		this.classification = classification;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getSMEs() {
		return sMEs;
	}
	public void setSMEs(String SMEs) {
		this.sMEs = SMEs;
	}
	public String getServerimpacted() {
		return serverimpacted;
	}
	public void setServerimpacted(String serverimpacted) {
		this.serverimpacted = serverimpacted;
	}
	public String getRepeated() {
		return repeated;
	}
	public void setRepeated(String repeated) {
		this.repeated = repeated;
	}
	public String getSuggestion() {
		return suggestion;
	}
	public void setSuggestion(String suggestion) {
		this.suggestion = suggestion;
	}
	
	 
	
	 
}
